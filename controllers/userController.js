const { error } = require('npmlog');
const model = require('../models/userModel');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
const bcrypt = require("bcrypt")
const numSaltRoundss = 10;
const sendMail = require('../services/mailService'); // וודא שהנתיב נכון
const fetchGPTResponse=require('../services/GPTService'); 
const SECRET_KEY = process.env.SECRET_KEY;
async function getUsers() {
  try {
      console.log("in controller getUsers");
      return model.getAllUsers();
  } catch (err) {
      throw err;
  }
}

// async function createUser(role_id, password, userName, email) {
//   try {
//     const result = await model.getUserByEmail(email);//checkes if he exists
//     console.log("RESULT CHECKING:   " + result);
//     if (result.length != 0) {
//       console.log("the user already exist")
//       throw new Error("user already exists, please login");
//     }
//     const hash = await bcrypt.hash(password, numSaltRoundss);
//     const newUser = model.createUser(role_id, hash, userName, email);
//     console.log("new user in controller  "+newUser)
//     return newUser;

//   } catch (err) {
//     throw err;
//   }
// }
async function createUser(role_id, password, userName, email,confirmguide) {
  try {
   
    if(confirmguide){
        try {
         
            await sendMail(req.body.email, "Welcome!", `Hello ${req.body.userName}, welcome to our service!`);
            console.log("Email sent successfully");
        } catch (mailError) {
            console.error("Failed to send email: ", mailError);
            return res.status(500).json({ error: "Failed to send email" });
      
    }
    }
    const result = await model.getUserByEmail(email);//checkes if he exists
    console.log("RESULT CHECKING:   "+result.length);
    if (result.length != 0) {
      console.log("the user already exist")
      throw new Error("user already exists, please login");
    }
    const hash = await bcrypt.hash(password, numSaltRoundss);
    const newUser = model.createUser(role_id, hash, userName, email);
    return newUser;

  } catch (err) {
    throw err;
  }
}

async function postLogin(email, password) {
  try {
    fetchGPTResponse("מה התאריך היום?");
    const result = await model.getUser(email);
    console.log("get the user in login.the user: "+result[0].id);
    if (result.length == 0) {
      console.log("this user does not exist, please signup ")
      throw new Error("this user does not exist, please signup");
    }

    const tablePassword = result[0].password;

    console.log(result);
    if (!(await bcrypt.compare(password, tablePassword))) {
      console.log("not Exist")
      await model.putFailLogin(email);
      throw new Error("not valid password");
    }
    else {
      console.log(result);
      console.log("returns the user     vvbhnjhgfghjkjhg");
      const user = {
        id:result[0].id,
        role: result[0].role_name,
        userName: result[0].user_name,
        email: result[0].email,
      };
      console.log("user ")
      console.log( user);
      await model.putSuccsesLogin(user.email);
      console.log("user " + user.userName);
      return user;

    }
  }
  catch (err) {
    console.log(err);
    throw err;

  }
}

async function authenticate(user) {
  console.log('authenticate');
  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY,);
  return token

};

async function getUser(id) {
  try {
    return model.getUser(id);
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
module.exports = { getUsers, authenticate, createUser, getUser, postLogin, getUserByEmail, }