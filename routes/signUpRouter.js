const express = require("express");
const router = express.Router();
const { authenticate, createUser } = require('../controllers/userController');
const sendMail = require('../mailService'); // וודא שהנתיב נכון
const cors = require('cors');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());

router.post("/", async (req, res) => {
    try {
        console.log("in router signup");
        const user = await createUser(req.body.role_id, req.body.password, req.body.userName, req.body.email,req.body.confirmguide);
        console.log("Created user: ", user);
       
        const token = await authenticate(user);
        console.log({ user, token });
        res.send({ user, token });
    } catch (err) {
        console.log("Error in signup: ", err);
        res.status(500).json({ error: "User creation failed" });
    }
});

module.exports = router;
