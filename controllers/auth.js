//const { validationResult } = require('express-validator/check');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Teacher = require("../models/teacher");
const Parent = require("../models/parent");
// const Admin = require("../models/admin");

exports.login = async (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  let loadedUser;
  let Test;
  if (password.charAt(0) == 1) {
    Test = Teacher;
  } else if (password.charAt(0) == 2) {
    Test = Parent;
  }
  // else Test = Admin...

  try {
    const user = await Test.findOne({ userName: userName });
    if (!user) {
      return res.json({
        loadedUser: "A user with this userName could not be found",
      });
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.json({
        loadedUser: "wrong password!",
      });
    }
    //token may use later to otharization..
    const token = jwt.sign(
      {
        userName: loadedUser.userName,
        userId: loadedUser._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    //res.status(200).json({ loadedUser: loadedUser });
    res.status(200).json({ token: token, loadedUser: loadedUser });
  } catch (err) {
    return res.json({
      loadedUser: "A user with this userName or password could not be found",
    });
  }
};
