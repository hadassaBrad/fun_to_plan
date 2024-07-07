// // קבע את הנתונים הראשוניים
// const sites = [
//     { id: 1, cost: 20, latitude: '29.787300', longitude: '34.976600' },
//     { id: 2, cost: 15, latitude: '30.787300', longitude: '35.976600' },
//     { id: 3, cost: 30, latitude: '31.787300', longitude: '36.976600' },
//     { id: 4, cost: 25, latitude: '32.787300', longitude: '37.976600' },
//     { id: 5, cost: 10, latitude: '33.787300', longitude: '38.976600' }
//   ];
  
//   const maxBudget = 50; // התקציב המרבי לטיול
//   const maxHours = 5; // הזמן המרבי לטיול
  
//   const startSite = { id: -1, cost: 0, latitude: '29.787300', longitude: '34.976600' }; // נקודת ההתחלה
  
//   const numSites = sites.length;
  
//   // פונקציה לחישוב ערך הפיטנסיה של פתרון נתון
//   function computeFitness(solution) {
//     let totalCost = 0;
//     let totalDistance = 0;
//     let totalTime = 0;
  
//     // התחל בנקודת ההתחלה
//     let currentPoint = startSite;
  
//     // חישוב הערך של הפתרון
//     for (let i = 0; i < solution.length; i++) {
//       const nextSite = sites[solution[i]];
  
//       // חישוב מרחק בין שני האתרים
//       const distance = calculateDistance(currentPoint, nextSite);
//       totalDistance += distance;
  
//       // חישוב זמן הנסיעה בין האתרים
//       const travelTime = distance / 60; // בשעות, לפי קילומטר
//       totalTime += travelTime;
  
//       // חישוב עלויות הנסיעה לאתר הנוכחי
//       totalCost += nextSite.cost;
  
//       // העברה אל האתר הבא
//       currentPoint = nextSite;
//     }
  
//     // החזרת הערך של הפיטנסיה
//     return { totalCost, totalDistance, totalTime };
//   }
  
//   // פונקציה לחישוב מרחק בין שני נקודות
//   function calculateDistance(pointA, pointB) {
//     const lat1 = parseFloat(pointA.latitude);
//     const lon1 = parseFloat(pointA.longitude);
//     const lat2 = parseFloat(pointB.latitude);
//     const lon2 = parseFloat(pointB.longitude);
  
//     // חישוב המרחק בין שני הנקודות בקילומטרים
//     const R = 6371; // רדיוס של כדור הארץ בקילומטרים
//     const dLat = toRadians(lat2 - lat1);
//     const dLon = toRadians(lon2 - lon1);
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//               Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//               Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c;
  
//     return distance;
//   }
  
//   // פונקציה להמרת מעלות לרדיאנים
//   function toRadians(degrees) {
//     return degrees * (Math.PI / 180);
//   }
  
//   // פונקציה ראשית להרצת האלגוריתם הגנטי
//   function geneticAlgorithm() {
//     // פתח ערכות קוד
//     let population = initializePopulation(10);
  
//     let generations = 0;
//     let fittestSolution = null;
//     let fittestFitness = Infinity;
  
//     while (generations < 100) {
//       // חישוב הערכים לכל פתרון
//       let fitnessValues = population.map(solution => computeFitness(solution));
  
//       // בחירת הפתרון הכי טוב
//       for (let i = 0; i < population.length; i++) {
//         const fitness = fitnessValues[i];
//         if (fitness.totalCost <= maxBudget && fitness.totalTime <= maxHours && fitness.totalCost < fittestFitness) {
//           fittestSolution = population[i];
//           fittestFitness = fitness.totalCost;
//         }
//       }
  
//       // אם נמצא הפתרון האופטימלי מספר אלגוריתמים
//       generations++;
//       population = evolvePopulation(population);
//     }
  
//     // הדפסה של הפתרון הטוב ביותר
//     console.log('הפתרון הטוב ביותר:');
//     console.log(fittestSolution.map(index => sites[index]));
//   }
  
  
  
// // Helper functions
// function calculateDistance(site1, site2) {
//     const lat1 = site1.latitude;
//     const lon1 = site1.longitude;
//     const lat2 = site2.latitude;
//     const lon2 = site2.longitude;
//     const R = 6371; // Radius of the Earth in km
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//               Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in km
// }

// function calculateTime(distance) {
//     const averageSpeed = 60; // Average speed in km/h
//     return distance / averageSpeed;
// }

// function calculateCost(distance) {
//     const costPerKm = 2; // Cost per km in currency units
//     return distance * costPerKm;
// }

// function fitnessFunction(chromosome, basket, startingPoint, maxTime, maxCost) {
//     let totalDistance = 0;
//     let totalTime = 0;
//     let totalCost = 0;
//     let currentSite = startingPoint;

//     for (let i = 0; i < chromosome.length; i++) {
//         const nextSite = basket[chromosome[i]];
//         const distance = calculateDistance(currentSite, nextSite);
//         const time = calculateTime(distance);
//         const cost = calculateCost(distance);

//         totalDistance += distance;
//         totalTime += time + nextSite.time;
//         totalCost += cost + nextSite.cost;

//         console.log(`Step ${i}:`);
//         console.log(`Next site: ${JSON.stringify(nextSite)}`);
//         console.log(`Distance: ${distance}, Time: ${time}, Cost: ${cost}`);
//         console.log(`Total Distance: ${totalDistance}, Total Time: ${totalTime}, Total Cost: ${totalCost}`);

//         currentSite = nextSite;
//     }

//     // Adding the return to the starting point
//     const returnDistance = calculateDistance(currentSite, startingPoint);
//     const returnTime = calculateTime(returnDistance);
//     const returnCost = calculateCost(returnDistance);

//     totalDistance += returnDistance;
//     totalTime += returnTime;
//     totalCost += returnCost;

//     console.log(`Return trip:`);
//     console.log(`Return Distance: ${returnDistance}, Return Time: ${returnTime}, Return Cost: ${returnCost}`);
//     console.log(`Total Distance: ${totalDistance}, Total Time: ${totalTime}, Total Cost: ${totalCost}`);

//     if (totalTime > maxTime || totalCost > maxCost) {
//         console.log('Penalized for exceeding maxTime or maxCost');
//         return Infinity; // Penalty for infeasible solutions
//     }

//     return 1 / (totalDistance + totalTime + totalCost);
// }

// function crossover(parent1, parent2) {
//     const crossoverPoint = Math.floor(Math.random() * parent1.length);
//     const child1 = parent1.slice(0, crossoverPoint).concat(parent2.filter(gene => !parent1.slice(0, crossoverPoint).includes(gene)));
//     const child2 = parent2.slice(0, crossoverPoint).concat(parent1.filter(gene => !parent2.slice(0, crossoverPoint).includes(gene)));
//     return [child1, child2];
// }

// function mutate(chromosome, mutationRate, basket) {
//     if (Math.random() < mutationRate) {
//         const mutationPoint = Math.floor(Math.random() * chromosome.length);
//         let newSiteIndex;
//         do {
//             newSiteIndex = Math.floor(Math.random() * basket.length);
//         } while (chromosome.includes(newSiteIndex));
//         chromosome[mutationPoint] = newSiteIndex;
//     }
//     return chromosome;
// }

// function reduceChromosomeSize(chromosome, basket, startingPoint, maxTime, maxCost, maxAttempts = 100) {
//     let attempts = 0;
//     while (chromosome.length > 0) {
//         const fitness = fitnessFunction(chromosome, basket, startingPoint, maxTime, maxCost);
//         if (fitness !== Infinity) break;
//         chromosome.pop();
//         attempts++;
//         if (attempts >= maxAttempts) break; // Avoid infinite loop
//     }
//     return chromosome;
// }

// // Genetic Algorithm
// async function geneticAlgorithm(basket, startingPoint, maxTime, maxCost, populationSize = 100, generations = 100, mutationRate = 0.01) {
//     // Initial population
//     console.log("in the algo");
//     let population = Array.from({ length: populationSize }, () => 
//         basket.map((_, index) => index).sort(() => Math.random() - 0.5)
//     );

//     let bestFitness = Infinity;
//     let bestIndividual = null;

//     for (let generation = 0; generation < generations; generation++) {
//         console.log(`Generation ${generation}`);
        
//         // Evaluate fitness
//         const fitnessScores = population.map(individual => fitnessFunction(individual, basket, startingPoint, maxTime, maxCost));
//         console.log(`Fitness scores calculated: ${fitnessScores}`);

//         // Find the best individual in the current generation
//         for (let i = 0; i < population.length; i++) {
//             if (fitnessScores[i] < bestFitness) {
//                 bestFitness = fitnessScores[i];
//                 bestIndividual = population[i];
//             }
//         }

//         console.log("Before selection");

//         // Selection
//         const selectedPopulation = population.map((_, i) => ({
//             chromosome: population[i],
//             fitness: fitnessScores[i]
//         })).sort((a, b) => a.fitness - b.fitness)
//           .slice(0, populationSize / 2)
//           .map(ind => ind.chromosome);

//         console.log("Before while");

//         // Crossover
//         const nextPopulation = [];
//         while (nextPopulation.length < populationSize) {
//             const parent1 = selectedPopulation[Math.floor(Math.random() * selectedPopulation.length)];
//             const parent2 = selectedPopulation[Math.floor(Math.random() * selectedPopulation.length)];
//             const [child1, child2] = crossover(parent1, parent2);
//             nextPopulation.push(child1, child2);
//         }

//         console.log("After while");

//         // Mutation
//         population = nextPopulation.map(individual => mutate(individual, mutationRate, basket));
//         console.log("After mutation");

//         // Reduce chromosome size to meet constraints
//         population = population.map(individual => {
//             console.log(`Before reduction: ${individual}`);
//             const reduced = reduceChromosomeSize(individual, basket, startingPoint, maxTime, maxCost);
//             console.log(`After reduction: ${reduced}`);
//             return reduced;
//         });

//         console.log(`After reduceChromosomeSize - Generation ${generation}:`);
//         population.forEach((individual, index) => {
//             const fitness = fitnessFunction(individual, basket, startingPoint, maxTime, maxCost);
//             console.log(`Individual ${index}: Fitness = ${fitness}, Chromosome = ${individual}`);
//         });
//     }

//     console.log("End of genetic algorithm");

//     return bestIndividual ? bestIndividual.map(index => basket[index]) : [];
// }
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
        totalCost += calculateCost(distance);
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
function geneticAlgorithm(basket, startingPoint, maxTime, maxCost, populationSize = 100, generations = 100, mutationRate = 0.01) {
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

// Sample usage
const startingPoint = { latitude: 32.0853, longitude: 34.7818 }; // Example starting point
const maxTime = 8; // 8 hours
const maxCost = 500; // Example budget

const basket = [
    { latitude: 32.0853, longitude: 34.7818, id: 1 },
    { latitude: 31.7683, longitude: 35.2137, id: 2 },
    // Add more sites with their respective latitude, longitude, and id
];

const bestRoute = geneticAlgorithm(basket, startingPoint, maxTime, maxCost);
console.log("Best route:", bestRoute);

module.exports = { geneticAlgorithm };
