const Parent = require("../models/parent");
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const axios = require("axios");
const mongoose = require("mongoose");
const student = require("../models/student");
const existingUsernames = [];
const existingpassword = [];
//const sendgridtransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport({
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
    .hash("Ahmad", 12)
    .then((password) => {
      const admin = new Admin({
        name: name,
        userName: "Ahmad",
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
  console.log(req.body);
  const formData = req.body; // Access the form data as key-value pairs in the formData object
  const studentName = formData.Data.studentName;
  const Gender = formData.Data.Gender;
  const parentName = formData.Data.parentName;
  const dateOfBirth = formData.Data.dateOfBirth;
  const emailAdress = formData.Data.emailAdress;
  const className = formData.Data.className;
  const telephonNumber = formData.Data.telephonNumber;
  const adress = formData.Data.adress;
  // const {
  //   studentName,
  //   Gender,
  //   adress,
  //   dateOfBirth,
  //   className,
  //   parentName,
  //   emailAdress,
  //   telephonNumber
  // } = req.body;

  const userName = generateUsername("p", emailAdress);
  const password = generatePassword("p", 7);
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
                //here why 1 is static ?
                numberOfChildren: 1,
                allStudents: student_1._id,
                state: state
              });

              return addparent.save();
            })
            .then(async (parent) => {
              console.log(parent);
              // const r = await axios.put(
              //   "https://api.chatengine.io/users/",
              //   {
              //     username: parent.name,
              //     secret: parent._id.toString(),
              //     first_name: parent.name
              //   },
              //   {
              //     headers: {
              //       "Private-Key": "dd26e14f-d313-4e3f-a6c3-d2ba2bb0747e"
              //     }
              //   }
              // );

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
          console.log(err);
          // return res.status(404).json({
          //   message: "some thing error"
          // });
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
              student.parent_id = parent[0]._id;
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
  console.log(req.body);
  const name = req.body.Data.name;
  const emailAdress = req.body.Data.emailAdress;
  const telepohoneNumber = req.body.Data.telepohoneNumber;
  const gender = req.body.Data.gender;
  const adress = req.body.Data.adress;
  const experiance = req.body.Data.experiance;
  const _class = req.body.Data._class;
  const dateOfBirth = req.body.Data.dateOfBirth;
  const state = "Teacher";
  const userName = generateUsername("t", emailAdress);
  const password = generatePassword("t", 4);

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
            student.teacher_id = teacher._id;
            student.save();
          });
          return teacher.save();
        })
        .then(async (teacher) => {
          // const r = await axios.put(
          //   "https://api.chatengine.io/users/",
          //   {
          //     username: teacher.name,
          //     secret: teacher._id.toString(),
          //     first_name: teacher.name
          //   },
          //   {
          //     headers: { "Private-Key": "dd26e14f-d313-4e3f-a6c3-d2ba2bb0747e" }
          //   }
          // );
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

exports.getAdminInfo = (req, res, next) => {
  const _id = req.params.id;
  // const _id = new mongoose.Types.ObjectId(id);
  Admin.findById(_id)
    .then((Admin) => {
      if (!Admin) {
        return res.json({ message: "not found" });
      }
      return res.json({ adminName: Admin.name });
    })
    .catch((err) => console.log(err));
};

// unique password
function generatePassword(type, length) {
  const charset = "123456789";
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
  const username = email;

  let baseName = username.split("@")[0];

  let uniqueName = baseName;
  let suffix = 1;
  while (existingUsernames.includes(uniqueName)) {
    uniqueName = baseName + suffix;
    suffix++;
  }
  existingUsernames.push(uniqueName);

  return type + uniqueName;
}

exports.getAllStudents = (req, res) => {
  Student.find({})
    .populate({ path: "parent_id" })
    .then((dbStudents) => {
      res.json(dbStudents);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllTeachers = (req, res) => {
  Teacher.find({})
    .then((dbStudents) => {
      res.json(dbStudents);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const dbStudent = await Student.findOne({ _id: id });
    const parentId = dbStudent.parent_id;

    const parent = await Parent.findOne({ _id: parentId })
      .populate({
        path: "allStudents"
      })
      .exec();
    const numStudents = parent.allStudents.length;
    const teacher = await Teacher.findOne({ _id: dbStudent.teacher_id })
      .populate({
        path: "allStudents"
      })
      .exec();
    if (teacher != null) {
      const indexToRemove = teacher.allStudents.findIndex(
        (student) => student._id.toString() === id.toString()
      );
      if (indexToRemove !== -1) {
        // Remove the student from the allStudents array using the $pull operator
        teacher.allStudents.splice(indexToRemove, 1);
        await teacher.save();
      }
    }

    await Parent.updateOne(
      { _id: dbStudent.parent_id },
      { $pull: { allStudents: id } }
    );
    await Student.deleteOne({ _id: id });
    console.log("Deleted successfully");

    if (numStudents <= 1) {
      await Parent.deleteOne({ _id: parentId });
      res.json("student and parent deleted successfully");
    } else {
      res.json("student deleted successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.deleteTeacher = async (req, res) => {
  try {
    const id = req.params.id;

    await Student.updateMany(
      { teacher_id: id },
      { $set: { teacher_id: null } }
    );

    await Teacher.deleteOne({ _id: id });
    console.log("Teacher Deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

exports.sendStudentInfo = async (req, res, next) => {
  id = req.params.id;
  try {
    const data = req.body;
    //  console.log(data);
    //Edit studentName, gender, adress, dateOfBirth
    await Student.updateOne(
      { _id: id },
      {
        $set: {
          studentName: data.studentName,
          gender: data.gender,
          adress: data.adress,
          dateOfBirth: data.dateOfBirth
        }
      }
    );
    //Edit class
    Student.findOne({ _id: id })
      .then(async (dbStudent) => {
        //console.log(dbStudent);
        // console.log(data.class);
        if (dbStudent.class != data.class) {
          dbStudent.class = data.class;
          dbStudent.save();
          await Teacher.updateOne(
            { _id: data.teacher_id },
            { $pull: { allStudents: id } }
          );
          await Teacher.updateOne(
            { class: data.class },
            { $push: { allStudents: id } }
          );
          try {
            const dbTeacher = await Teacher.findOne({ class: data.class });
            if (dbTeacher == null) {
              dbStudent.teacher_id = null;
              dbStudent.save();
            } else {
              const tId = dbTeacher._id;
              await Student.updateOne(
                { _id: id },
                {
                  $set: {
                    class: data.class,
                    teacher_id: tId
                  }
                }
              );
              dbStudent.save();
            }
          } catch (err) {
            console.log(err);
          }
        }
      })
      .catch((err) => console.log(err));
    //Edite parent name

    Parent.findOne({ _id: data.parent_id })
      .then(async (dbParent) => {
        if (data.name != dbParent.name) {
          dbParent.name = data.name;
          dbParent.save();
        }
        if (data.emailAdress != dbParent.emailAdress) {
          dbParent.emailAdress = data.emailAdress;
          const updatePassword = generatePassword("p", 7);
          const updateUserName = generateUsername("p", data.emailAdress);
          bcrypt.hash(updatePassword, 12).then((hashedPw) => {
            dbParent.password = hashedPw;
            dbParent.userName = updateUserName;
            dbParent.save();
          });
          // dbParent.save();
          //Edit gmail
          await transporter.sendMail({
            to: dbParent.emailAdress,
            from: "ilovesyria898testnode@gmail.com",
            subject: "Student Tracking System",
            html: `<h2>Hello ${dbParent.name} <br> </h2> 
         <h3>  <br> username : ${updateUserName} <br> password: ${updatePassword}</h3>
         <h4>This is your information so that you can log in to your website to track
          your children's academic performance on the following website: 
          <a href="http://localhost:3000/login">Login</a> . </h4>
         `
          });
        }
        //Edit phone
        if (data.telepohoneNumber != dbParent.telepohoneNumber) {
          dbParent.telepohoneNumber = data.telepohoneNumber;
          dbParent.save();
        }
      })
      .then((result) => {
        return res.json("the Student informatiion updated !!");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.error(error);
  }
};

exports.sendTeacherInfo = async (req, res, next) => {
  id = req.params.id;
  try {
    const data = req.body;
    //Edit name, gender, adress, dateOfBirth,exp,class,telepohoneNumber
    await Teacher.updateOne(
      { _id: id },
      {
        $set: {
          name: data.name,
          gender: data.gender,
          adress: data.adress,
          dateOfBirth: data.dateOfBirth,
          experiance: data.experiance,
          //class: data.class,
          telepohoneNumber: data.telepohoneNumber
        }
      }
    );
    //Edit gmail
    Teacher.findOne({ _id: id })
      .then(async (teacherdb) => {
        //Edit class
        const studentdb = await Student.find({ class: data.class });
        await Student.updateMany(
          { teacher_id: teacherdb._id }
          // { $unset: { teacher_id: 1 } }
        );
        teacherdb.allStudents = teacherdb.allStudents.filter((studentId) => {
          return (
            !teacherdb.class ||
            studentdb.some((student) => student._id.equals(studentId))
          );
        });
        if (teacherdb.class != data.class) {
          await Student.updateMany(
            { teacher_id: teacherdb._id },
            { $unset: { teacher_id: 1 } }
          );

          teacherdb.class = data.class;

          const studentdb = await Student.find({ class: data.class });
          teacherdb.allStudents = studentdb.map((student) => student._id);
          await teacherdb.save();
          await Student.updateMany(
            { class: teacherdb.class },
            { $set: { teacher_id: teacherdb._id } }
          );
        }

        if (data.emailAdress != teacherdb.emailAdress) {
          teacherdb.emailAdress = data.emailAdress;
          const updatePassword = generatePassword("t", 7);
          const updateUserName = generateUsername("t", data.emailAdress);
          bcrypt.hash(updatePassword, 12).then((hashedPw) => {
            teacherdb.password = hashedPw;
            teacherdb.userName = updateUserName;
            teacherdb.save();
          });

          transporter.sendMail({
            to: teacherdb.emailAdress,
            from: "ilovesyria898testnode@gmail.com",
            subject: "Student Tracking System",
            html: `<h2>Hello ${teacherdb.name} <br> </h2> 
         <h3>  <br> username : ${updateUserName} <br> password: ${updatePassword}</h3>
         <h4>This is your information so that you can log in to your website to track
          your children's academic performance on the following website: 
          <a href="http://localhost:3000/login">Login</a> . </h4>
         `
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error(error);
  }
};
