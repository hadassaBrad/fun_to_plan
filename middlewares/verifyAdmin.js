const { getUserById } = require('../controllers/userController');
require('dotenv').config();

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await getUserById(req.user);

    if (user[0].role_id == 2) {
      next();
    }
    else
      return res.sendStatus(403); // טוקן לא תקין

  } catch (err) {
    res.status(500).json({ error: "User creation failed" });
  }
}

module.exports = verifyAdmin;