const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("in midllwear");
    if (!token) {
      return res.sendStatus(401); // ללא טוקן
    }
  
    jwt.verify(
      token,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return res.sendStatus(403); // טוקן לא תקין
        }
        req.user = decoded.userId; // נניח שאתה משתמש בשדה userId בטוקן
        next();
      }
    );
  }
module.exports = verifyJWT