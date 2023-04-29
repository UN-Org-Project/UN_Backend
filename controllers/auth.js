//const { validationResult } = require('express-validator/check');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const Teacher = require("../models/teacher");
const Parent = require("../models/parent");
const Admin = require("../models/admin");

exports.login = async (req, res, next) => {
  const userName = req.body.username;
  const password = req.body.password;
  let loadedUser;
  let Test;
  if (password.charAt(0) == "t") {
    Test = Teacher;
  } else if (password.charAt(0) == "p") {
    Test = Parent;
  } else {
    Test = Admin;
  }

  try {
    const user = await Test.findOne({ userName: userName });
    if (!user) {
      return res.status(404).json({
        message: "the UserName is not correct  try again"
      });
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(404).json({
        message: "the password is not correct  try again"
      });
    }
    //token may use later to otharization..
    // const token = jwt.sign(
    //   {
    //     userName: loadedUser.userName,
    //     userId: loadedUser._id.toString()
    //   },
    //   "somesupersecretsecret",
    //   { expiresIn: "1h" }
    // );
    //res.status(200).json({ loadedUser: loadedUser });
    //7a982130-a74a-4f66-bcc2-6a0b102fdff0

    //chating ApI
    try {
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        {
          username: loadedUser._id.toString(),
          secret: loadedUser._id.toString(),
          first_name: loadedUser.name
        },
        { headers: { "Private-Key": "3254e769-28b8-4061-8fa8-a618a48c6f45" } }
      );
      return res.status(200).json({
        id: loadedUser._id,
        state: loadedUser.state,
        chating_username: r.data,
        first_name: loadedUser.name
      });
    } catch (e) {
      console.log(e);
    }
  } catch (err) {
    console.log(err);
  }
};
