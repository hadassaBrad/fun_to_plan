const express = require("express");
const router = express.Router();
const { createUser } = require('../controllers/userController');

const cors = require('cors');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
  }));
  

router.post("/", async (req, res) => {
    try {
        const response = await createUser(req,res);
        res.send(response);
    } catch (err) {
        res.status(500).json({ error: "User creation failed" });
    }
});

module.exports = router;
