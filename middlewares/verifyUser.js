const { getUserById } = require('../controllers/userController');
require('dotenv').config();
const verifyUser = async (req, res, next) => {
  try{
    console.log("in midllwear verifyAdmin");
    const user = await getUserById(req.user);
    if(user.role_id==1){ next();    }
    else
    return res.sendStatus(403); // טוקן לא תקין

  }  catch (err) {
    console.log("in verify user ", err);
    res.status(500).json({ error: "User verify failed" });
}
   
  }
module.exports = verifyUser