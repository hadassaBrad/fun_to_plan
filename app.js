const express = require('express');
<<<<<<< HEAD
const config = require('./config/config');
=======

const adminRouter = express.Router();

// Define routes for admin

>>>>>>> 98f01a739fda180f7defff9211b1845ccd38578a
const path = require('path');
const session = require('express-session');
const app = express();
app.use (express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors'); 

const loginRouter=require("./routes/login")
const aignUpRouter=require("./routes/signUp")
const adminRouter=require("./routes/admin")
const basketRouter=require("./routes/basketRoter")
const galleryRouter=require("./routes/gallery")
const sitesRouter=require("./routes/sitesRouter")
const port = 3000;
const SECRET_KEY = process.env.SECRET_KEY;
app.use( session ({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } 
  }));
  app.use(cors());

app.use("/login",(req, res, next)=>{
  next();
}, loginRouter);

<<<<<<< HEAD
app.use("/signUp",aignUpRouter);

app.use("/admin",adminRouter);

=======
const loginRouter=require("./routes/loginRouter")
app.use("/login",loginRouter);

const signUpRouter=require("./routes/signUpRouter")
app.use("/signUp",aignUpRouter);

const adminRouter=require("./routes/adminRoter")
app.use("/admin",signUpRouter);

const galleryRouter=require("./routes/galleryRoter")
>>>>>>> 98f01a739fda180f7defff9211b1845ccd38578a
app.use("/gallery", galleryRouter);


app.use("/basket",basketRouter)

app.use("/site",sitesRouter)

<<<<<<< HEAD

app.use("/basket",basketRouter)
=======
>>>>>>> 98f01a739fda180f7defff9211b1845ccd38578a

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// // Define routes for admin
// adminRouter.get('/', (req, res) => {
//   res.send('Welcome to the admin section');
// });

// adminRouter.get('/dashboard', (req, res) => {
//   res.send('This is the admin dashboard');
// });

// // In your main app file
// const express = require('express');
// const app = express();

// const session = require('express-session');

// // Configure session with a secret key
// app.use(session({
//   secret: 'your_secret_key_here',
//   resave: false,
//   saveUninitialized: true
// }));

// // Use the admin router
// app.use('/admin', adminRouter);

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
