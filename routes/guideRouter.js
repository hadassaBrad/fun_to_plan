//הראוטר הזה יכלול שלושה סוגים: בקשות שינאפ, בקשות לוגין, ובקשות שינוי ל רולים למשתמשים. 
const express = require("express");
const router = express.Router();
// const session = require('express-session');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const verifyJWT = require("../middlewares/verifyJWT");
const verifyAdmin = require("../middlewares/verifyAdmin");
const { getGuides } = require('../controllers/userController');
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
}));
router.get("/", async (req, res) => {
    try {
            const guides = await getGuides();
            console.log("all guides in router...");
            console.log(guides);
            res.status(200).send(guides);
        
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});


module.exports = router;