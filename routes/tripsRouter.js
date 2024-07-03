const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
const { buildTripRoute } = require('../controllers/tripController');
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
}));

router.post("/", async (req, res) => {
    try {
        console.log("in router tripsss, am i here?????")
        console.log(req.body);

        const response = await buildTripRoute(req.body.userId, req.body.wantsGuide, req.body.startPoint, req.body.cost, req.body.numOfHours, req.body.dateForTrip);
        console.log("response in router!!!!!!!!!!!!!")
        console.log(response);
        res.status(200).send(response);

        // const response = await createBasket(req.body.user.id, req.body.site[0].id);

    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router