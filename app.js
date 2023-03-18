//npm install nodemailer
//gmail is ilovesyria898testnode@gmail.com
//pass is evhunvoydpipxgrd
// or pmuojgznqazvmwmp
//  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
//  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
// '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
//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
//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

//npm install @sendgrid/mail
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const parentRoutes = require("./routes/parent");
const teacherRoutes = require("./routes/teacher");
const studentRoutes = require("./routes/student");

app.use(bodyParser.json()); // application/json
app.use(express.json()); // its important to Thunder Client done
//app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//---------------------------

// send email 2 its good

// const nodemailer = require("nodemailer");
// const sgMail = require("@sendgrid/mail");
// const sendgridTransport = require("nodemailer-sendgrid-transport");

// const API_KEY =
//   "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";

// sgMail.setApiKey(API_KEY);

// const message = {
//   to: "yaseenzzzzz898@gmail.com",
//   from: "ilovesyria898testnode@gmail.com",
//   subject: "Hello from sendgrid",
//   text: "Hello world!",
//   html: "<h1>You succesfully login!</h1>",
// };

// app.get("/", (req, res) => {
// sgMail
//   .send(message)
//   .then((response) => {
//     res.json('send mail successfully')
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// })

//---------------------------

// const transport = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:API_KEY
//     },
//   })
// );

// app.get("/", (req, res) => {
//   transport.sendMail({
//     to: "yaseenzzzzz898@gmail.com",
//     from: "ilovesyria898testnode@gmail.com",
//     subject: "Testing Koding 101 Email",
//    html: '<h1>You succesfully signed up!</h1>'
//   }).then(result => {
//     res.json('send mail successfully')
//   })
// });

// send email 3 maxmilean

// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");

// const transport = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         "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",
//     },
//   })
// );

// app.get("/", (req, res) => {
//   transport
//     .sendMail({
//       to: "yaseenzzzzz898@gmail.com",
//       from: "ilovesyria898testnode@gmail.com",
//       subject: "Maxmilean wow!!!",
//      html: "<h1>You succesfully signed up!</h1>",
//     })
//     .then(() => {
//       res.json("send mail successfully");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// send mail 4
// const sgMail = require("@sendgrid/mail");
// require('dotenv').config();
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: "yaseenzzzzz898@gmail.com",
//   from: "ilovesyria898testnode@gmail.com",
//   subject: "Testing Koding 101 Email",
//   text: "Hello, world",
//   html: "<h1>You succesfully signed up!</h1>",
// };

// app.get("/", (req, res) => {
//   sgMail
//     .send(msg)
//     .then(() => {
//       res.json("send mail successfully");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//send email 5
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ilovesyria898testnode@gmail.com",
    pass: "pmuojgznqazvmwmp",
  },
});

var mailOptions = {
  from: "ilovesyria898testnode@gmail.com",
  to: "yaseenzzzzz898@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
  html: "<h1>Hello there</h1>",
};

app.get("/", (req, res) => {
  transporter
    .sendMail(mailOptions)
    .then(() => {
      res.json("send mail successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Midlwares
app.use("/auth", authRoutes);
app.use(parentRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//connecting to database
const MONGODB_URI =
  // "mongodb+srv://yaseen:20203302@usermanagement.2r3p529.mongodb.net/Parents_Studnts";
  "mongodb+srv://muathmhawich94:0932681293@cluster0.zgtx4nb.mongodb.net/parent-studnet-teacher";

//listen
mongoose
  .connect(MONGODB_URI)
  .then(console.log("Database Connected!"))
  .then((result) => {
    app.listen(3000, () => {
      console.log("The server is listing on ", 3000, "now");
    });
  })
  .catch((err) => {
    console.log(err);
  });
