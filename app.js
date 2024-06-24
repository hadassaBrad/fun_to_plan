const express = require('express');
const config = require('./config/config');
const adminRouter = express.Router();
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors'); 
const loginRouter=require("./routes/loginRouter")
const signUpRouter=require("./routes/signUpRouter")
// const adminRouter=require("./routes/admin")
const basketRouter=require("./routes/basketRouter")
const galleryRouter=require("./routes/galleryRouter")
const sitesRouter=require("./routes/sitesRouter")
const guideRouter=require ("./routes/guideRouter")
const userRouter=require ("./routes/userRouter")
const authenticationRouter=require("./routes/authonticationRouter");
const SECRET_KEY = process.env.SECRET_KEY;
const app = express();
const verifyJWT=require("./middlewares/verifyJWT");
app.use (express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend app URL
  credentials: true
}));

const port=3000;
app.use(cookieParser());
app.use("/authentication", verifyJWT,authenticationRouter);
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


