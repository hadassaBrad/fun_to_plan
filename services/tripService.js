// Helper functions
function calculateDistance(site1, site2) {
    const lat1 = site1.latitude;
    const lon1 = site1.longitude;
    const lat2 = site2.latitude;
    const lon2 = site2.longitude;
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function calculateTime(distance) {
    const averageSpeed = 60; // Average speed in km/h
    return distance / averageSpeed;
}

function calculateCost(distance) {
    const costPerKm = 2; // Cost per km in currency units
    return distance * costPerKm;
}

function fitnessFunction(chromosome, basket, startingPoint, maxTime, maxCost) {
    let totalDistance = 0;
    let totalTime = 0;
    let totalCost = 0;
    let currentSite = startingPoint;

    for (let i = 0; i < chromosome.length; i++) {
        const nextSite = basket[chromosome[i]];
        const distance = calculateDistance(currentSite, nextSite);
        totalDistance += distance;
        totalTime += calculateTime(distance);
        totalCost += calculateCost(distance)+currentSite.cost;
        currentSite = nextSite;
    }

    // Adding the return to the starting point
    const returnDistance = calculateDistance(currentSite, startingPoint);
    totalDistance += returnDistance;
    totalTime += calculateTime(returnDistance);
    totalCost += calculateCost(returnDistance);

    if (totalTime > maxTime || totalCost > maxCost) {
        return Infinity; // Penalty for infeasible solutions
    }

    return 1 / (totalDistance + totalTime + totalCost);
}

function crossover(parent1, parent2) {
    const crossoverPoint = Math.floor(Math.random() * parent1.length);
    const child1 = parent1.slice(0, crossoverPoint).concat(parent2.filter(gene => !parent1.slice(0, crossoverPoint).includes(gene)));
    const child2 = parent2.slice(0, crossoverPoint).concat(parent1.filter(gene => !parent2.slice(0, crossoverPoint).includes(gene)));
    return [child1, child2];
}

function mutate(chromosome, mutationRate, basket) {
    if (Math.random() < mutationRate) {
        const mutationPoint = Math.floor(Math.random() * chromosome.length);
        const newSiteIndex = Math.floor(Math.random() * basket.length);
        chromosome[mutationPoint] = newSiteIndex;
    }
    return chromosome;
}

// Genetic Algorithm
async function geneticAlgorithm(basket, startingPoint, maxTime, maxCost, populationSize = 100, generations = 100, mutationRate = 0.01) {
    // Initial population
    let population = Array.from({ length: populationSize }, () => 
        basket.map((_, index) => index).sort(() => Math.random() - 0.5)
    );

    for (let generation = 0; generation < generations; generation++) {
        // Evaluate fitness
        const fitnessScores = population.map(individual => fitnessFunction(individual, basket, startingPoint, maxTime, maxCost));

        // Selection
        const selectedPopulation = population.map((_, i) => ({
            chromosome: population[i],
            fitness: fitnessScores[i]
        })).sort((a, b) => a.fitness - b.fitness)
          .slice(0, populationSize / 2)
          .map(ind => ind.chromosome);

        // Crossover
        const nextPopulation = [];
        while (nextPopulation.length < populationSize) {
            const parent1 = selectedPopulation[Math.floor(Math.random() * selectedPopulation.length)];
            const parent2 = selectedPopulation[Math.floor(Math.random() * selectedPopulation.length)];
            const [child1, child2] = crossover(parent1, parent2);
            nextPopulation.push(child1, child2);
        }

        // Mutation
        population = nextPopulation.map(individual => mutate(individual, mutationRate, basket));
    }

    // Get the best solution
    const bestIndividual = population.reduce((best, individual) => 
        fitnessFunction(individual, basket, startingPoint, maxTime, maxCost) < fitnessFunction(best, basket, startingPoint, maxTime, maxCost) ? individual : best, population[0]);
   
    return bestIndividual.map(index => basket[index]);
}
module.exports={geneticAlgorithm};
// // Sample usage
// const startingPoint = { latitude: 32.0853, longitude: 34.7818 ,cost=o }; // Example starting point
// const maxTime = 8; // 8 hours
// const maxCost = 500; // Example budget

// const basket = [
//     { latitude: 32.0853, longitude: 34.7818, id: 1,cost: 100 },
//     { latitude: 31.7683, longitude: 35.2137, id: 2 },
//     // Add more sites with their respective latitude, longitude, and id
// ];

// const bestRoute = geneticAlgorithm(basket, startingPoint, maxTime, maxCost);
// console.log("Best route:", bestRoute);
