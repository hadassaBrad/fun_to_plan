//הראוטר הזה יכלול שלושה סוגים: בקשות שינאפ, בקשות לוגין, ובקשות שינוי ל רולים למשתמשים. 
const express = require("express");
const router = express.Router();
// const session = require('express-session');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const verifyJWT = require("../middlewares/verifyJWT");
const verifyAdmin = require("../middlewares/verifyAdmin");
const { getUsers, getAllWaitinGuides, updateUserPermition } = require('../controllers/userController');
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
}));
router.get("/", verifyJWT, verifyAdmin, async (req, res) => {
    try {
        const id = req.query.user_id;
        if (id == 4) {
            console.log("in user router, getAllWaitinGuides");
            const allWaitinGuides = await getAllWaitinGuides();
            console.log("all waiting guides in router...");
            console.log(allWaitinGuides);
            res.status(200).send(allWaitinGuides);
        }
        else {
            console.log("getUsers router in else");
            res.send(await getUsers());
        }

    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.put("/:id", verifyJWT, verifyAdmin, async (req, res) => {
    try {
        console.log("in user router for updating");
        const id = req.params.id;
        const role = req.body.role;
        console.log("in router for updating");
        const result = await updateUserPermition(id, role);
        res.status(200).send(result);
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router;