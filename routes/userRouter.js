//הראוטר הזה יכלול שלושה סוגים: בקשות שינאפ, בקשות לוגין, ובקשות שינוי ל רולים למשתמשים. 
const express = require("express");
const router = express.Router();
// const session = require('express-session');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { getUsers } = require('../controllers/userController');
const cors = require('cors');
router.use(cors());
router.get("/", async (req, res) => {
    try {
        console.log("getUsers router")
        res.send(await getUsers());
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
})
module.exports = router;


