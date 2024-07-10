const express = require("express");
const loginRouter = express.Router();
loginRouter.use(express.json());
loginRouter.use(express.urlencoded({ extended: true }));
const { postLogin } = require('../controllers/userController.js');

loginRouter.route("/").post(async (req, res) => {
    try {
      const response = await postLogin(req, res);
      res.send(response);
    }
    catch (err) {
      if (err.message == "not Exsist") {
        const error = new Error('user does not exists');
        res.status(401).json({ error: error.message });
      }
      if (err.message == "not valid password") {
        const error = new Error('not valid password');
        res.status(401).json({ error: error.message });
      }

      else {
        const error = new Error(err.message);
        res.status(401).json({ error: error.message });
      }
    }
  })
module.exports = loginRouter;