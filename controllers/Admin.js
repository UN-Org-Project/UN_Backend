const Parent = require("../models/parent");
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const existingUsernames = [];
const existingpassword = [];
//const sendgridtransport = require("nodemailer-sendgrid-transport");
const transporter =nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ilovesyria898testnode@gmail.com",
    pass: "pmuojgznqazvmwmp"
  }
});

// Added astatic Admin to manage the process for add teacher and add parent
exports.addAdmin = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  bcrypt
    .hash("amuath", 12)
    .then((password) => {
      const admin = new Admin({
        name: name,
        userName: "muath Mhawich",
        password: password,
        emailAdress: email,
        state: "Admin"
      });
      return admin.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Admin created!", parentId: result._id });
    })
    .catch((err) => console.log(err));
};

//add parent and student in DB
exports.postCreatParent = (req, res) => {
  const {
    studentName,
    Gender,
    image,
    dateOfBirth,
    className,
    parentName,
    emailAdress,
    telephonNumber
  } = req.body;

  const userName = generateUsername("P@", emailAdress);

  const password = generatePassword("P", 11);

  const state = "Parent";
  Parent.find({ emailAdress: emailAdress, telepohoneNumber: telephonNumber })
    .then(async (parent) => {
      if (parent.length == 0) {
        //create student
        const student = new Student({
          studentName: studentName,
          gender: Gender,
          image: image,
          dateOfBirth: dateOfBirth,
          class: className 
        });
        try {
          const student_1 = await student.save();
          bcrypt
            .hash(password, 12)
            .then((hashedPw) => {
              const addparent = new Parent({
                parentName: parentName,
                userName: userName,
                password: hashedPw,
                emailAdress: emailAdress,
                telepohoneNumber: telephonNumber,
                numberOfChildren: 1,
                allStudents: student_1._id,
                state: state
              });
              return addparent.save();
            })
            .then(async (parent) => {
              const result_1 = await transporter.sendMail({
                to: parent.emailAdress,
                from: "ilovesyria898testnode@gmail.com",
                subject: "Student Tracking System",
                html: `<h2>Hello ${parent.parentName} <br> </h2> 
                 <h3>  <br> username : ${userName} <br> password: ${password}</h3>
                 <h4>This is your information so that you can log in to your website to track
                  your children's academic performance on the following website: 
                  <a href="http://localhost:3000/login">Login</a> . </h4>
                 `
              });
              return res.status(201).json({
                message: "new Parent created!",
                parentId: parent._id
              });
            });
        } catch (err) {
          return console.log(err);
        }
      } else {
        const student = new Student({
          studentName: studentName,
          gender: Gender,
          image: image,
          dateOfBirth: dateOfBirth,
          class: className
        });
        try {
          const student_3 = await student.save();
          const result_2 = await Parent.findOneAndUpdate(
            { emailAdress: emailAdress },
            {
              $push: { allStudents: student_3._id }
            },
            { new: true }
          );
          return res.status(201).json({
            message:
              "the parent is excest the student become involved the parent",
            StudentId: student_3._id
          });
        } catch (err_1) {
          return console.log(err_1);
        }
      }
    })
    .catch((err) => console.log(err));
};

exports.postCreatTeacher = (req, res) => {
  const name = req.body.name;

  const emailAdress = req.body.emailAdress;
  const telepohoneNumber = req.body.telepohoneNumber;
  const gender = req.body.gender;
  const image = req.body.image;
  const _class = req.body.class;
  const dateOfBirth = req.body.dateOfBirth;
  const state = "Teacher";
  const userName = generateUsername("t@", emailAdress);
  const password = generatePassword("t@", 8);

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const teacher = new Teacher({
        name: name,
        userName: userName,
        password: hashedPw,
        emailAdress: emailAdress,
        telepohoneNumber: telepohoneNumber,
        gender: gender,
        image: image,
        class: _class,
        dateOfBirth: dateOfBirth,
        state: state
      });
      Student.find({ class: teacher.class })
        .then((students) => {
          students.forEach((student) => {
            teacher.allStudents.push(student._id);
          });
          return teacher;
        })
        .then(async (teacher) => {
          const result_1 = await transporter.sendMail({
            to: teacher.emailAdress,
            from: "ilovesyria898testnode@gmail.com",
            subject: "Student Tracking System",
            html: `<h2>Hello Mr.${teacher.name} <br> </h2> 
            <h3>  <br> username : ${userName} <br> password: ${password}</h3>
            <h4>This is your information so that you can log in to your website 
            to add all the necessary information to track the academic performance 
            of your class students and the abiliyty to communocate with patents. on the following website: 
             <a href="http://localhost:3000/login">Login</a> . </h4>
            `
          });
          return teacher;
        })
        .then((teacher) => {
          return teacher.save();
        })
        .then((result) => {
          res
            .status(201)
            .json({ message: "Teacher created!", teacherId: result._id });
        });
    })
    .catch((err) => console.log(err));
};

// unique password
function generatePassword(type, length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678912346758900099837465253226728435advfgdfghrfdds1122345566";
  let password = "";
  let suffix = 1;
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  while (existingpassword.includes(password)) {
    password = password + suffix;
    suffix++;
  }
  existingpassword.push(password);

  return type + password;
}
//unique userName

function generateUsername(type, email) {
  const validChars = /[^\w]/gi;
  const username = email.replace(validChars, "");

  let baseName = username.split("gmail")[0];

  let uniqueName = baseName;
  let suffix = 1;
  while (existingUsernames.includes(uniqueName)) {
    uniqueName = baseName + suffix;
    suffix++;
  }
  existingUsernames.push(uniqueName);

  return type + uniqueName;
}
