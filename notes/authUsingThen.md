'const { validationResult } = require('express-validator/check');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Teacher = require("../models/teacher");
const Parent = require("../models/parent");
const Admin = require("../models/admin");

exports.login = (req, res, next) => {
const userName = req.body.userName;
const password = req.body.password;
let loadedUser;
let Test;
let innerTest = false;

if (password.charAt(0) == 1) {
Test = Teacher;
innerTest = true;
} else if (password.charAt(0) == 2) {
Test = Parent;
innerTest = true;
}
else Test = Admin...

if (innerTest) {

     Test.findOne({ userName: userName }).then((user) => {
       if (!user) {
         return res.json({
           loadedUser: "A user with this userName could not be found",
         });
       }
       loadedUser = user;
       return bcrypt.compare(password, user.password).then((isEqual) => {
         if (!isEqual) {
           return res.json({
             loadedUser: "wrong password!",
           });
         }
         token may use later to otharization..
          const token = jwt.sign(
            {
              userName: loadedUser.userName,
              userId: loadedUser._id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "1h" }
          );
         res.status(200).json({ loadedUser: loadedUser });
         .json({ token: token, userId: loadedUser._id.toString(), loadedUser: loadedUser });
       });
     });

} else {
return res.json({
loadedUser: "A user with this userName or password could not be found",
});
}
};
'
