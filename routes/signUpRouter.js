const express = require("express");
const router = express.Router();
//const jwt = require('jsonwebtoken');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { authenticate, createUser } = require('../controllers/userController');
const cors = require('cors');
router.use(cors());


router.post("/", async (req, res) => {
    try {
        console.log("in router signup")
        const user = await createUser(req.body.role_id, req.body.password, req.body.userName, req.body.email);
        console.log("fdsdssdffffff   "+user);
        const token = await authenticate(user)
        console.log({ user, token });
        res.send({ user, token });
    }
    catch(err) {
        console.log("in catch"+err)
        const error = new Error("user not found");
        res.status(401).json({ error: error.message });
    }
})


module.exports = router