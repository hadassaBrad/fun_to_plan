const { getUserById } = require('../controllers/userController');
require('dotenv').config();
const verifyguide = async (req, res, next) => {
  try{
    const user = await getUserById(req.user);
    if(user.role_id==3){ next();    }
    else
    return res.sendStatus(403); // טוקן לא תקין

  }  catch (err) {
    res.status(500).json({ error: "guide verify failed" });
}
   
  }
module.exports = verifyguide