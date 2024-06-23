const express = require("express");
const router = express.Router();
const { createUser } = require('../controllers/userController');

const cors = require('cors');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());

router.post("/", async (req, res) => {
    try {
        const response = await createUser(req,res);
        res.send({user:response.user, token:response.token});
    } catch (err) {
        console.log("Error in signup: ", err);
        res.status(500).json({ error: "User creation failed" });
    }
});

module.exports = router;
