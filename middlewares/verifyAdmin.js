const { getUserById } = require('../controllers/userController');
require('dotenv').config();
const verifyAdmin = async (req, res, next) => {
  try{
    console.log("in midllwear verifyAdmin");
    const user = await getUserById(req.user);
    if(user.role_id==2){ next();    }
    else
    return res.sendStatus(403); // טוקן לא תקין

  }  catch (err) {
    console.log("in verify admin ", err);
    res.status(500).json({ error: "User creation failed" });
}
   
  }
module.exports = verifyAdmin