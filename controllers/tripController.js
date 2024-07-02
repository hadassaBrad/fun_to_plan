const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors({
 origin: 'http://localhost:5173', // Replace with your frontend app URL
 credentials: true
}));

async function buildTripRoute(sites,startPoint,cost,numOfHours) {
    try {


        console.log("in controller' haddasssa is sweet");
        //return model.getSites(start, limit);
    } catch (err) {
        throw err;
    }
}
module.exports = { buildTripRoute }