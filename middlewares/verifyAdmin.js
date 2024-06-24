
require('dotenv').config();
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("in midllwear verifyJWT");
    if (!token) {
      console.log("any token");
      return res.sendStatus(401); // ללא טוקן
     
    }
  
   
  }
module.exports = verifyAdmin