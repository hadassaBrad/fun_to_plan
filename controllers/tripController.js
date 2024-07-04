// const express = require("express");
// const router = express.Router();
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));
// const cors = require('cors');
// const model = require('../models/tripModel');
// const { geneticAlgorithm } = require("../services/tripService")
// const fetch = require('node-fetch');
// router.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend app URL
//     credentials: true
// }));
// async function buildTripRoute(id, wantsGuide, startPoint, cost, numOfHours, date) {
//     try {

//         //1. הפקת נקודת ציון מכתובת
//         const coordinates = await getcoordinates(startPoint);
//         console.log("in controller, coordinates: " + coordinates[0] + " /" + coordinates[1]);


//         //2.קבלת הסל שעבורו בודקים את המסלול
//         const basket = await model.getBasketForTrip(id);
//         console.log("the basket: ")
//         console.log(basket);

//         //3.זימון האלגוריתם 
//         const startingPoint =
//             { latitude: coordinates[0], longitude: coordinates[1], cost: 0 }
//         console.log("startingPoint: " + startingPoint)
//         const bestRoute = await geneticAlgorithm(basket, startingPoint, numOfHours, cost);
//         console.log("the bestRoute: ");
//         console.log(bestRoute);
//         //4.קריאה לפונקציית יצירת מסלול. 
//         const newRoute = await model.createTripRoute(id, bestRoute);
//         if (wantsGuide) {
//             console.log("new route");
//             console.log(newRoute);
//             console.log(newRoute.insertId)
//             // addGuide(id, date) ;
//             addGuide(newRoute.insertId, date);
//         }
//         return await model.getTripRouteForUser(newRoute.insertId);
//     } catch (err) {
//         throw err;
//     }
// }



// async function addGuide(tripId, date) {
//     try {
//         console.log("trip id");
//         console.log(tripId);
//         const allGuidesByDate = await model.getGuidesByDate(date, tripId);
//         console.log("all guides by date");
//         console.log(allGuidesByDate);
//         const result = await model.addGuideToTrip(tripId, allGuidesByDate.id, date);
//         console.log(result);
//         return result;
//     }

//     catch (err) {
//         throw err;
//     }

// }
// async function getcoordinates(startPoint) {
//     try {
//         const fetch = require('node-fetch');

//         console.log("in getCoordinates in the controller");

//         const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startPoint)}`;

//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.length > 0) {
//             const { lat, lon } = data[0];
//             console.log(`Latitude: ${lat}, Longitude: ${lon}`);
//             return [lat, lon];
//         } else {
//             console.log('Address not found.');
//             return null;
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }



// module.exports = { buildTripRoute, }
const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
const model = require('../models/tripModel');
const { geneticAlgorithm } = require("../services/tripService");

router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
}));

async function buildTripRoute(id, wantsGuide, startPoint, cost, numOfHours, date) {
    try {
        // 1. הפקת נקודת ציון מכתובת
        const coordinates = await getcoordinates(startPoint);
        console.log("in controller, coordinates: " + coordinates[0] + " /" + coordinates[1]);

        // 2. קבלת הסל שעבורו בודקים את המסלול
        const basket = await model.getBasketForTrip(id);
        console.log("the basket: ");
        console.log(basket);

        // 3. זימון האלגוריתם
        const startingPoint = { latitude: coordinates[0], longitude: coordinates[1], cost: 0 };
        console.log("startingPoint: " + startingPoint);
        const bestRoute = await geneticAlgorithm(basket, startingPoint, numOfHours, cost);
        console.log("the bestRoute: ");
        console.log(bestRoute);

        // 4. קריאה לפונקציית יצירת מסלול
        const newRoute = await model.createTripRoute(id, bestRoute);
        if (wantsGuide) {
            console.log("new route");
            console.log(newRoute);
            console.log(newRoute.insertId);
            addGuide(newRoute.insertId, date);
        }
        return await model.getTripRouteForUser(newRoute.insertId);
    } catch (err) {
        throw err;
    }
}

async function addGuide(tripId, date) {
    try {
        console.log("trip id");
        console.log(tripId);
        const allGuidesByDate = await model.getGuidesByDate(date, tripId);
        console.log("all guides by date");
        console.log(allGuidesByDate);
        const result = await model.addGuideToTrip(tripId, allGuidesByDate.id, date);
        console.log(result);
        return result;
    } catch (err) {
        throw err;
    }
}

async function getcoordinates(startPoint) {
    try {
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

        console.log("in getCoordinates in the controller");

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startPoint)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const { lat, lon } = data[0];
            console.log(`Latitude: ${lat}, Longitude: ${lon}`);
            return [lat, lon];
        } else {
            console.log('Address not found.');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
async function getAllRoutesForUser(userId) {
    try {
        return await model.getAllRoutesForUser(userId)
    } catch (err) {
        throw err;
    }
}

module.exports = { buildTripRoute, getAllRoutesForUser };


