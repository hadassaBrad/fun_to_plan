const basket = [
    { id: 10, longitude: '35.653400', latitude: '33.249000', site_name: 'Tel Dan Nature Reserve', cost: 30 },
    { id: 9, longitude: '35.500000', latitude: '32.833300', site_name: 'Arbel National Park', cost: 15 },
    { id: 7, longitude: '35.683300', latitude: '32.966700', site_name: 'Yehudia Nature Reserve', cost: 25 },
    { id: 8, longitude: '35.039500', latitude: '32.744700', site_name: 'Carmel National Park', cost: 30 },
    { id: 6, longitude: '34.801300', latitude: '30.609700', site_name: 'Makhtesh Ramon', cost: 20 },
    { id: 16, longitude: '35.494500', latitude: '31.496500', site_name: 'Dead Sea', cost: 60 },
    { id: 15, longitude: '35.235500', latitude: '31.778000', site_name: 'Old City of Jerusalem', cost: 50 },
    { id: 17, longitude: '35.071489', latitude: '32.922286', site_name: 'Old Acre', cost: 30 },
    { id: 14, longitude: '34.895800', latitude: '32.500000', site_name: 'Caesarea', cost: 35 }
];

const startingPoint = { id: -1, cost: 0, latitude: '31.7957081', longitude: '35.1990793' };

const maxTime = 60; // שעות מקסימליות
const maxCost = 122000; // עלות מקסימלית

function calculateDistance(lat1, lon1, lat2, lon2) {
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    const R = 6371; // רדיוס כדור הארץ בקילומטרים
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function findOptimalRoute(basket, startingPoint, maxTime, maxCost) {
    function getTravelTime(distance) {
        return distance / 60; // 60 קילומטר לשעה
    }

    const n = basket.length;
    let optimalRoute = [];
    let bestRoute = [];
    let bestTime = Infinity;
    let bestCost = Infinity;

    function dfs(currentPoint, currentTime, currentCost, visited) {
        if (currentTime > maxTime || currentCost > maxCost) {
            return;
        }
        if (visited.length > optimalRoute.length ||
            (visited.length === optimalRoute.length && currentTime < bestTime && currentCost < bestCost)) {
            optimalRoute = [...visited];
            bestTime = currentTime;
            bestCost = currentCost;
        }

        for (let i = 0; i < n; i++) {
            if (!visited.includes(basket[i])) {
                const distance = calculateDistance(
                    parseFloat(currentPoint.latitude),
                    parseFloat(currentPoint.longitude),
                    parseFloat(basket[i].latitude),
                    parseFloat(basket[i].longitude)
                );
                const travelTime = getTravelTime(distance);
                visited.push(basket[i]);
                dfs(basket[i], currentTime + travelTime, currentCost + basket[i].cost, visited);
                visited.pop();
            }
        }
    }

    dfs(startingPoint, 0, 0, [startingPoint]);
    if (optimalRoute.length > 0) {
        optimalRoute.push(startingPoint);
    }
    return optimalRoute;
}

const optimalRoute = findOptimalRoute(basket, startingPoint, maxTime, maxCost);

if (optimalRoute.length > 0) {
    console.log("המסלול האופטימלי הוא:");
    console.log(optimalRoute);
} else {
    console.log("לא נמצא מסלול שעומד במגבלות שנקבעו");
}

module.exports = { findOptimalRoute };