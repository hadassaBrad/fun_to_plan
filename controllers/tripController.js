const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
const model = require('../models/tripModel');
const basketModel = require('../models/basketModel');
const { findOptimalRoute } = require("../services/tripService");

router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
}));

async function buildTripRoute(id, wantsGuide, startPoint, cost, numOfHours, date) {
    try {
        // 1. הפקת נקודת ציון מכתובת
        const coordinates = await getcoordinates(startPoint);

        // 2. קבלת הסל שעבורו בודקים את המסלול
        const basket = await model.getBasketForTrip(id);
        const startingPoint = { latitude: coordinates[0], longitude: coordinates[1], cost: 0 };

        //שלב 3- קבלת המסלול האופטימלי
        let bestRoute = await findOptimalRoute(basket, startingPoint, numOfHours, cost);
        bestRoute = [startingPoint, ...bestRoute];

        // 4. קריאה לפונקציית יצירת מסלול
        const newRoute = await model.createTripRoute(id, bestRoute);

        //  const newRoute = await model.createTripRoute(id, basket);
        if (wantsGuide) {
            await addGuide(newRoute.insertId, date);
        }
        await basketModel.deleteAllBasket(id);//when user get his trip- he dosnt need any more his old basket
        return await model.getTripRouteForUser(newRoute.insertId);
    } catch (err) {
        throw err;
    }
}

async function addGuide(tripId, date) {
    try {
        const allGuidesByDate = await model.getGuidesByDate(date);
        if (allGuidesByDate.length == 0) {
            throw new Error("there are no available guide for this date");
        }
        const result = await model.addGuideToTrip(tripId, allGuidesByDate[0].id, date);
        return result;
    } catch (err) {
        throw err;
    }
}

async function getcoordinates(startPoint) {
    try {
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startPoint)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const { lat, lon } = data[0];
            return [lat, lon];
        }
        else {
            throw new Error('Address not found.');
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

async function getAllRoutesFrGuide(guideId) {
    try {
        return await model.getAllRoutesFrGuide(guideId);
    } catch (err) {
        throw err;
    }
}

module.exports = { buildTripRoute, getAllRoutesForUser, getAllRoutesFrGuide };


