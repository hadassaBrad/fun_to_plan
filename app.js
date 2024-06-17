const express = require('express');
const config = require('./config/config');
const adminRouter = express.Router();

const path = require('path');
//const session = require('express-session');
const app = express();
app.use (express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors'); 

const loginRouter=require("./routes/loginRouter")

const signUpRouter=require("./routes/signUpRouter")
// const adminRouter=require("./routes/admin")
const basketRouter=require("./routes/basketRouter")
const galleryRouter=require("./routes/galleryRouter")
const sitesRouter=require("./routes/sitesRouter")
const guideRouter=require ("./routes/guideRouter")
const userRouter=require ("./routes/userRouter")
const port = 3000;
const SECRET_KEY = process.env.SECRET_KEY;
// app.use( session ({
//     secret: SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true } 
//   }));
app.use(cors());
app.use("/users",userRouter);
app.use("/login", loginRouter);
app.use("/signUp",signUpRouter);
app.use("/admin",adminRouter);
//app.use("/guide",guideRouter)
app.use("/gallery", galleryRouter);
app.use("/basket",basketRouter);
app.use("/sites",sitesRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


