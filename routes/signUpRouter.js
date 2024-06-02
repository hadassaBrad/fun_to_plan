const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { authenticate } = require('../controllers/userController');
const cors = require('cors');
router.use(cors());

  
const SECRET_KEY = process.env.SECRET_KEY;
router.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } // set secure: true in production with HTTPS
  }));

//   userRouter.route("/")
//     .post(async (req, res) => {
//         try {

//             const user = await authenticate(req, res);
//             //  createUser(req.body.lastName, req.body.firstName, req.body.email, req.body.phone, req.body.address.city, req.body.address.street, req.body.password);
//             res.send(user);
//         }
//         catch {
//             res.status(401).send("this user is already exist, please login");
//         }
//     })

    router .post("/", async (req, res) => {
        try {
          // איך ומה מחזירים?
            const user = await createUser(req.body.role_id,  req.body.password, req.body.userName , req.body.email);
            const response = authenticate(req, res)
            res.send(user);
        }
        catch {
            res.status(401).send("this user is already exist, please login");
        }
    })


module.exports = router