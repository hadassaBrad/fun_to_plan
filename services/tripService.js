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

module.exports = { findOptimalRoute };
