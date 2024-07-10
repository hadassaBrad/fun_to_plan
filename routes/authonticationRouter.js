const express = require("express");
const router = express.Router();
const { getUserById } = require('../controllers/userController');

const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
  }));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", async (req, res) => {
    try {
        const response = await getUserById(req.user);
        const user = {
            id: response[0].id,
            role: response[0].role_name,
            userName: response[0].user_name,
            email: response[0].email,
          };

        res.send(user);
    } catch (err) {
        res.status(500).json({ error: "User creation failed" });
    }
});

module.exports = router;