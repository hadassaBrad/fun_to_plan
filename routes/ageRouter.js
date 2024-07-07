const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { getAge } = require('../controllers/ageController');
const cors = require('cors');
router.use(cors({
 origin: 'http://localhost:5173', // Replace with your frontend app URL
 credentials: true
}));

router.get("/", async (req, res) => {
    try {
        console.log("id: " + id);
        const result=await getAge();
        res.send(result);
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
})
module.exports = router