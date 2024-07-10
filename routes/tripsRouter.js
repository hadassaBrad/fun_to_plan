const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
const { buildTripRoute, getAllRoutesForUser, getAllRoutesFrGuide } = require('../controllers/tripController');
const verifyJWT = require("../middlewares/verifyJWT");
const verifyUser = require("../middlewares/verifyUser");
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
}));
router.get("/", async (req, res) => {
    try {
        const userId = req.query.user_id;
        const guideId = req.query.guide_id;
        let routes = null;
        if (userId) {
            routes = await getAllRoutesForUser(userId);
        }
        if (guideId) {
            routes = await getAllRoutesFrGuide(guideId);
        }
        if (routes) {
            res.status(200).send(routes);
        }
        else {
            throw new Error("problerm with you request");
        }
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
})

router.post("/", verifyJWT, verifyUser, async (req, res) => {
    try {
        const response = await buildTripRoute(req.body.userId, req.body.wantsGuide, req.body.startPoint, req.body.cost, req.body.numOfHours, req.body.dateForTrip);
        res.status(200).send(response);
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router