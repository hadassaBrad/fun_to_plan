const model = require('../models/galleryModel');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require("bcrypt")
const numSaltRoundss = 10;
// const SECRET_KEY = process.env.SECRET_KEY;
// app.use(session({
//     secret: SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true } // set secure: true in production with HTTPS
//   }));


//מה צריך לעשות פה?
//צריך עבור יצירת לקוח חדש: :
//1. ליצור ולהצפין את הסיסמה ורק אז לשלוח אותה לפונקציית יצירת הלקוח במודל
//2.ליצור טוקן
//3.להחזיר את מה שצריך- ובעיקר להבין מה קרוה עם הסשן ואיך מחזירים אותו

const SECRET_KEY = process.env.SECRET_KEY;

async function createUser(role_id,  password, userName, email) {
  try {
    const result = await model.getUserByEmail(email);//checkes if he exists
    if (result.length != 0) {
      throw err;
    }
   const hash = await bcrypt.hash(password, numSaltRoundss);
    return model.createUser(role_id,  hash, userName, email);

  } catch (err) {
    throw err;
  }
}
const authenticate = (req, res) => {
  const { username, password } = req.body;
 // שליפת המשתמש מהדאטה בייס            const user = users.find(u => u.username === username && u.password === password);
 //אם המשתמש קיים 
 if (user) {
    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    req.session.token = token; // שמירת הטוקן ב-session
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Authenticated', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// const authenticate = (req, res) => {
  
    
//       const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
      
  
//   };
  

  module.exports = { authenticate }