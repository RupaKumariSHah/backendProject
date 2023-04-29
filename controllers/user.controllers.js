//  const userModel = require("../models/user_model");
const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");
//const catchAsync = require("../Utils/catchAsync");
require("dotenv");

//create a new user
// const salt = bcrypt.genSalt(10);
const addUser = async (req, res) => {
  try {
    //console.log(req.body);
    const newuser = new userModel({
      name: req.body.name,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
    });

    await newuser.save();
    res.json({
      message: "User Registered Succesfully...",
      status: 200,
    });
  } catch (error) {
    res.json({
      message: `Error while user Registered ${error} `,
      // message: `Register is unSuccessful `,
      // error: error,
      status: 400,
    });
  }
};

//=========================login=======================
const login = async (req, res) => {
  try {
    var username = req.body.username;
    var password = req.body.password;

    const user = await userModel.findOne({
      $or: [{ email: username }, { phone: username }],
    });
    const result = await userModel.findOne({ password: password });

    if (user) {
      if (result) {
        let token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPRIE_TIME }
        );

        if (token) {
          const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

          const userid = decode.id;
          let addToken = {
            token: token,
          };
          await userModel.findByIdAndUpdate(userid, { $set: addToken });
        }

        res.status(201).json({
          message: "Login Successfully",
          token: token,
        });
        // res.json({
        //     message: 'Password does not match...'
        // })
      } else {
        res.json({
          message: "Password does not match...",
        });
      }
    } else {
      res.json({
        message: "Invalid Username...",
      });
    }
  } catch (error) {
    res.json({
      message: `Login time error... ${error}`,
    });
  }
};
//otp
exports.userOtpsend = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "please Enter your email" });
  }
  try {
    const userid = await userModel.findById(req.params.id);
    if (userid) {
    } else {
      res.json({
        message: "this users not exists...",
      });
    }
  } catch (error) {}
};
//===============Reset Password===========

//==================GetallUsers===================

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({
      users,
    });
  } catch (error) {
    res.json({
      message: `All Users... ${error}`,
    });
  }
};

//=====================get userby id
const getuseriddata = async (req, res) => {
  try {
    const userid = await userModel.findById(req.params.id);
    res.json({
      userid,
    });
  } catch (error) {
    res.json({
      message: `All Users... ${error}`,
    });
  }
};

module.exports = {
  addUser,
  login,
  // userLogout,
  getAllUser,
  getuseriddata,
};
