const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyJWT = (req, res, next) => {
  try{const token = req.cookies.jwt;
    console.log("in midllwear verifyJWT");
    if (!token) {
      console.log("any token");
      return res.sendStatus(401); // ללא טוקן
    }
  
    jwt.verify(
      token,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return res.sendStatus(403); // טוקן לא תקין
        }
        console.log("verified "+token)
        req.user = decoded.userId; // נניח שאתה משתמש בשדה userId בטוקן
        next();
      }
    );}  
    catch (err) {
      console.log("in auth ", err);
      res.status(500).json({ error: "User creation failed" });
  }
  }
module.exports = verifyJWT