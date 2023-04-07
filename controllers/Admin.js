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

//Added astatic Admin to manage the process for add teacher and add parent
exports.addAdmin = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  bcrypt
    .hash("muath", 12)
    .then((password) => {
      const admin = new Admin({
        name: name,
        userName: "muath",
        password: password,
        emailAdress: email,
        state: "Admin"
      });
      return admin.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Admin created!", parentId: result._id });
    })
    .catch((err) => console.log(err));
};

//add parent and student in DB
exports.postCreatParent = (req, res) => {
  const {
    studentName,
    Gender,
    adress,
    dateOfBirth,
    className,
    parentName,
    emailAdress,
    telephonNumber
  } = req.body;

  const userName = generateUsername("P_", emailAdress);
  const password = generatePassword("P", 7);
  const state = "Parent";

  Parent.find({ emailAdress: emailAdress, telepohoneNumber: telephonNumber })
    .then(async (parent) => {
      if (parent.length == 0) {
        //create student
        const student = new Student({
          studentName: studentName,
          gender: Gender,
          adress: adress,
          dateOfBirth: dateOfBirth,
          class: className 
        });
        try {
          const student_1 = await student.save();
          bcrypt
            .hash(password, 12)
            .then((hashedPw) => {
              const addparent = new Parent({
                name: parentName,
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
              console.log(parent);

              //*****add teacher_id reference in student
              Teacher.findOne({ class: className })

                .then((teacher) => {
                  if (!teacher) {
                    student_1.parent_id = parent._id;
                    return student_1.save();
                  } else {
                    teacher.allStudents.push(student_1._id);
                    student_1.teacher_id = teacher._id;
                    teacher.save();
                    student_1.parent_id = parent._id;
                    return student_1.save();
                  }
                })
                .catch((err) => console.log(err));

              const result_1 = await transporter.sendMail({
                to: parent.emailAdress,
                from: "ilovesyria898testnode@gmail.com",
                subject: "Student Tracking System",
                html: `<h2>Hello ${parent.name} <br> </h2> 
                 <h3>  <br> username : ${userName} <br> password: ${password}</h3>
                 <h4>This is your information so that you can log in to your website to track
                  your children's academic performance on the following website: 
                  <a href="http://localhost:3000/login">Login</a> . </h4>
                 `
              });
              return res.status(200).json({
                message: "new Parent created!",
                parentId: parent._id
              });
            });
        } catch (err) {
          return res.status(404).json({
            message: "some thing error"
          });
        }
      } else {
        const student = new Student({
          studentName: studentName,
          gender: Gender,
          adress: adress,
          dateOfBirth: dateOfBirth,
          class: className
        });
        //****** * add teacher_id reference in stuedent
        Teacher.findOne({ class: className })

          .then((teacher) => {
            if (!teacher) {
              student.parent_id = parent[0]._id;
              return student.save();
            } else {
              teacher.allStudents.push(student._id);
              student.teacher_id = teacher._id;
              teacher.save();

              return student.save();
            }
          })
          .catch((err) => console.log(err));
        try {
          // const student_3 = await student.save();
          const result_2 = await Parent.findOneAndUpdate(
            { emailAdress: emailAdress },
            {
              $push: { allStudents: student._id }
            },
            { new: true }
          );
          return res.status(200).json({
            message:
              "the parent is excest the student become involved the parent",
            StudentId: student._id
          });
        } catch (err) {
          console.log(err);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// add teacher in DB

exports.postCreatTeacher = (req, res) => {
  const name = req.body.name;

  const emailAdress = req.body.emailAdress;
  const telepohoneNumber = req.body.telepohoneNumber;
  const gender = req.body.gender;
  const adress = req.body.adress;
  const experiance = req.body.experiance;
  const _class = req.body.class;
  const dateOfBirth = req.body.dateOfBirth;
  const state = "Teacher";
  const userName = generateUsername("T_", emailAdress);
  const password = generatePassword("T", 7);

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
        adress: adress,
        experiance: experiance,
        class: _class,
        dateOfBirth: dateOfBirth,
        state: state
      });
      Student.find({ class: teacher.class })
        .then((students) => {
          students.forEach((student) => {
            teacher.allStudents.push(student._id);
          });
          return teacher.save();
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
          Student.find({ class: teacher.class })
            .then((students) => {
              students.forEach((student) => {
                student.teacher_id = teacher._id;
                student.save();
              });
              return teacher;
            })
            .catch((err) => console.log(err));
          return teacher.save();
        })
        .then((teacher) => {
          res
            .status(200)
            .json({ message: "Teacher created!", teacherId: teacher._id });
        });
    })
    .catch((err) => console.log(err));
};

// unique password
function generatePassword(type, length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGH012345678912346758900099837465253226728435advfgdfghrfdds1122345566";
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