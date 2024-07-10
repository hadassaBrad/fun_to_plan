const { getUserById } = require('../controllers/userController');
require('dotenv').config();
const verifyUser = async (req, res, next) => {
  try{
    const user = await getUserById(req.user);
    if(user[0].role_id==1){ 
      next();    
    }
    else
    return res.sendStatus(403); // טוקן לא תקין

  }  catch (err) {
    res.status(500).json({ error: "User verify failed" });
}
   
  }
module.exports = verifyUser