const { error } = require('npmlog');
const model = require('../models/userModel');
const jwt = require('jsonwebtoken');

// const session = require('express-session');
const bcrypt = require("bcrypt")
const numSaltRoundss = 10;
const sendMail = require('../services/mailService'); // וודא שהנתיב נכון
const SECRET_KEY = process.env.SECRET_KEY;
async function getUsers() {
  try {
    console.log("in controller getUsers");
    return model.getAllUsers();
  } catch (err) {
    throw err;
  }
}

async function handleGuide(req,res) {
  try {
    req.body.role_id = 4;
   // await sendMail(req.body.email, "Welcome!", `Hello ${req.body.userName}, welcome to our service!`);
    console.log("Email sent successfully");
  } catch (mailError) {
    throw new Error("Failed to send email: ", mailError);
    // return res.status(500).json({ error: "Failed to send email" });

  }
}

async function createUser(req, res) {
  let role_id = req.body.role_id;
  const password = req.body.password;
  const userName = req.body.userName;
  const email = req.body.email;
  const confirmguide = req.body.confirmguide;

  try {

    if (confirmguide) {   role_id = 4;
      // await sendMail(req.body.email, "Welcome!", `Hello ${req.body.userName}, welcome to our service!`);
       console.log("Email sent successfully"); };
    const result = await model.getUserByEmail(email);//checkes if he exists
    if (result.length != 0) {
      console.log("the user already exist")
      throw new Error("user already exists, please login");
    }
    //יצירת הצפנה
    const hash = await bcrypt.hash(password, numSaltRoundss);
    const newUser = await model.createUser(role_id, hash, userName, email);

    const token = jwt.sign(
      { "userId": newUser.id },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    return {user:newUser, token:token};
  } catch (err) {
    throw err;
  }
}

async function postLogin(req,res) {
 const email=req.body.email;
 const password=req.body.password;
  try {
    console.log("email, in user login controller  "+ email);
    const result = await model.getUser(email);
    if (result.length == 0) {
      console.log("this user does not exist, please signup ")
      throw new Error("this user does not exist, please signup");
    }
    const tablePassword = result[0].password;

    if (!(await bcrypt.compare(password, tablePassword))) {
      console.log("not Exist")
      await model.putFailLogin(email);
      throw new Error("not valid password");
    }
    else {
      const user = {
        id: result[0].id,
        role: result[0].role_name,
        userName: result[0].user_name,
        email: result[0].email,
      };
      await model.putSuccsesLogin(user.email);
      const token = jwt.sign(
        { "userId": user.id },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );
      console.log("token; "+token);
      res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      console.log(res.cookie);
      return {user:user, token:token};
     // return user;

    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

// async function authenticate(req) {
//   const accessToken = jwt.sign(
//     { "username": foundUser.username },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: '30s' }
//   );
//   // const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY,);
//   // return token

// };

async function getUser(id) {
  try {
    return model.getUser(id);
  } catch (err) {
    throw err;
  }
}
async function getUserById(id){
  try {
    return model.getUserById(id);
  } catch (err) {
    throw err;
  }
}
async function getUserByEmail(email) {
  try {
    console.log("in create user get by id");

    return model.getUserByEmail(email);
  } catch (err) {
    throw err;
  }
}

async function updateUser() {

}
module.exports = { getUsers,  createUser, getUser, postLogin, getUserByEmail, getUserById}