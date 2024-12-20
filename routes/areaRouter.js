const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { getAreas } = require('../controllers/areaController');
const cors = require('cors');
router.use(cors({
 origin: 'http://localhost:5173', 
 credentials: true
}));

router.get("/", async (req, res) => {
    try {
        const result=await getAreas();       
        res.send(result);
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
})
module.exports = router