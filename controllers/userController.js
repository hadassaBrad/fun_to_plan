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
    return model.getAllUsers();
  } catch (err) {
    throw err;
  }
}
async function getGuide(id) {
  try {
    return model.getGuide(id);
  } catch (err) {
    throw err;
  }
}


async function getAllWaitinGuides() {
  try {
    const allWaitinGuides = await model.getAllWaitinGuides();
    return allWaitinGuides;
  } catch (err) {
    throw err;
  }
}

async function createUser(req, res) {
  let role_id = req.body.role_id;
  const password = req.body.password;
  const userName = req.body.userName;
  const email = req.body.email;
  const confirmguide = req.body.confirmguide;

  try {

    if (confirmguide) {
      role_id = 4;
      await sendMail(req.body.email, "Welcome!", `Hello ${req.body.userName}, welcome to our service!
        we will be in touch with you in the next days`);
    };
    const result = await model.getUserByEmail(email);

    if (result.length != 0) {
      throw new Error("user already exists, please login");
    }

    const hash = await bcrypt.hash(password, numSaltRoundss);
    const newUser = await model.createUser(role_id, hash, userName, email);

    const token = jwt.sign(
      { "userId": newUser.id },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    return { user: newUser, token: token };
  } catch (err) {
    throw err;
  }
}

async function postLogin(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {


    const result = await model.getUser(email);
    if (result.length == 0) {
      throw new Error("this user does not exist, please signup");
    }
    const tablePassword = result[0].password;

    if (!(await bcrypt.compare(password, tablePassword))) {
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

      res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      return { user: user, token: token };

    }
  }
  catch (err) {
    throw err;
  }
}


async function getUser(id) {
  try {
    return model.getUser(id);
  } catch (err) {
    throw err;
  }
}
async function getUserById(id) {
  try {
    return model.getUserById(id);
  } catch (err) {
    throw err;
  }
}
async function getUserByEmail(email) {
  try {
    return model.getUserByEmail(email);
  } catch (err) {
    throw err;
  }
}

async function getGuides() {
  try {
    return model.getGuides();
  } catch (err) {
    throw err;
  }
}

async function updateUserPermition(id, role) {
  try {
    return model.updateUserPermition(id, role);
  } catch (err) {
    throw err;
  }
}
module.exports = { getGuide,getAllWaitinGuides, getUsers, createUser, getUser, postLogin, getUserByEmail, getUserById, updateUserPermition, getGuides  };