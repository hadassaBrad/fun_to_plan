const express = require("express");
const loginRouter = express.Router();
loginRouter.use(express.json());
loginRouter.use(express.urlencoded({ extended: true }));
const { authenticate, postLogin } = require('../controllers/userController.js');
loginRouter.route("/")
  .post(async (req, res) => {
    try {
      console.log("in Login roter")
      const user = await postLogin(req.body.email, req.body.password);
      const token = await authenticate(user)
      console.log(token)
      user={
        ...user,
        token:token
      };
      console.log("sendthe user to client "+user);
   res.send(user);
  
    }
    catch (err) {
      if (err.message == "not Exsist") {
        res.status(401).send("this user not exist, please signup");
      }
      if (err.message == "not valid password") {
        res.status(401).send("email or password is not valid");
      }
    }
  })
module.exports = loginRouter;


//מה נרצה שיהיה לנו בזמן של הלוגין
//לחשוב על זה: האם ברגע שמשהו עבר את הסף המותא אז חוסמים לו את החשבון? האם החסימה שלו במשך 5 דקות מלהכנס היא קשורה לשרת או ללקוח?

