const express = require('express');
const config = require('./config/config');
const path = require('path');
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
router.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } 
  }));
  app.use(cors());

app.use("/login",(req, res, next)=>{
  next();
}, loginRouter);

app.use("/signUp",aignUpRouter);

app.use("/admin",adminRouter);

app.use("/gallery", galleryRouter);


app.use("/basket",basketRouter)

app.use("/site",sitesRouter)


app.use("/basket",basketRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
