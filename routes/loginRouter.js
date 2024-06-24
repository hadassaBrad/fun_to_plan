const express = require("express");
const loginRouter = express.Router();
loginRouter.use(express.json());
loginRouter.use(express.urlencoded({ extended: true }));
const { postLogin } = require('../controllers/userController.js');
loginRouter.route("/")
  .post(async (req, res) => {
    try {
      const response = await postLogin(req, res);
      console.log("response in postlogin")
      console.log(response);
      res.send(response);
    }
    catch (err) {
      if (err.message == "not Exsist") {
        console.log("in catch login 1");
        const error = new Error('user does not exists');
        res.status(401).json({ error: error.message });
      }
      if (err.message == "not valid password") {
        // res.status(401).send("email or password is not valid");
        console.log("in catch login 1");
        const error = new Error('not valid password');
        res.status(401).json({ error: error.message });
      }

      else {
        console.log("in else in catch here err " + err.message)
        const error = new Error(err.message);
        res.status(401).json({ error: error.message });
      }
    }
  })
module.exports = loginRouter;


//מה נרצה שיהיה לנו בזמן של הלוגין
//לחשוב על זה: האם ברגע שמשהו עבר את הסף המותא אז חוסמים לו את החשבון? האם החסימה שלו במשך 5 דקות מלהכנס היא קשורה לשרת או ללקוח?

