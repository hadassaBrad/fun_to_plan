//הראוטר הזה יכלול שלושה סוגים: בקשות שינאפ, בקשות לוגין, ובקשות שינוי ל רולים למשתמשים. 
const express = require("express");
const router = express.Router();
// const session = require('express-session');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const verifyJWT=require("../middlewares/verifyJWT");
const verifyAdmin=require("../middlewares/verifyAdmin");
const { getUsers ,getAllWaitinGuides,updateUserPermition} = require('../controllers/userController');
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
            res.status(200).send(allWaitinGuides);
        }
        else {
            console.log("getUsers router")
            res.send(await getUsers());
        }

    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.put("/:id",verifyJWT, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const role_id=req.body.role_id;
await updateUserPermition(id,role_id);

        res.status(200).send();
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router;