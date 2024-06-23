const express = require("express");
const router = express.Router();
const { getUserById } = require('../controllers/userController');

const cors = require('cors');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const response = await getUserById(req.user);
        console.log("in user auth");
        console.log(response)
        res.send({response});
    } catch (err) {
        console.log("in auth ", err);
        res.status(500).json({ error: "User creation failed" });
    }
});

module.exports = router;