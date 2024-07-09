const { getUserById } = require('../controllers/userController');
require('dotenv').config();

const verifyAdmin = async (req, res, next) => {
  try {
    console.log("in midllwear verifyAdmin");
    console.log(req.user);
    const user = await getUserById(req.user);
    console.log(user);
    console.log(user[0].role_id)

    if (user[0].role_id == 2) {
      console.log("in next of verify admin...");
      console.log(user);
      next();
    }
    else
      return res.sendStatus(403); // טוקן לא תקין

  } catch (err) {
    console.log("in verify admin ", err);
    res.status(500).json({ error: "User creation failed" });
  }
}

module.exports = verifyAdmin;