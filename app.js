const express = require('express');
const path = require('path');
const app = express();
app.use (express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const SECRET_KEY = process.env.SECRET_KEY;
router.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } 
  }));//להבין מה בעצם  קורה כאן ולמה זה מממוקם כאן


const loginRouter=require("./routes/login")
app.use("/login",loginRouter);

const aignUpRouter=require("./routes/signUp")
app.use("/signUp",aignUpRouter);

const adminRouter=require("./routes/admin")
app.use("/admin",adminRouter);

const galleryRouter=require("./routes/gallery")
app.use("/gallery", galleryRouter);

const basketRouter=require("./routes/basketRoter")
app.use("/basket",basketRouter)

const sitesRouter=require("./routes/sitesRouter")
app.use("/site",sitesRouter)

const basketRouter=require("./routes/")
app.use("/basket",basketRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
