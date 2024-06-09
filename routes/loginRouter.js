const express = require("express");
const loginRouter = express.Router();
loginRouter.use(express.json());
loginRouter.use(express.urlencoded({ extended: true }));
const { authenticate, postLogin } = require('../controllers/userController.js');
loginRouter.route("/")
  .post(async (req, res) => {
    try {
      const user = await postLogin(req.body.email, req.body.password);
      const token = await authenticate(user)
      res.send({ user, token });
    }
    catch (err) {
      res.status(401).send(err.message);

    }
  })
module.exports = loginRouter;


//מה נרצה שיהיה לנו בזמן של הלוגין

//דבר ראשון:
//האם הוא חסום???

//דבר שני:
//מתי שמצליחים לרשום להעלות את הזה שלו...

//דבר שלישי:
//שלא מצליחים להירשם, לעלות את הזה הזה

//דבר רביעי:
//
