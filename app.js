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


// Midlwares
app.use('/auth', authRoutes);
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
