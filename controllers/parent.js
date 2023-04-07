const bcrypt = require("bcryptjs");
const Parent = require("../models/parent");
const Student = require("../models/student");
const mongoose = require("mongoose");
const { getAllStudents } = require("./student");
const student = require("../models/student");

exports.getAllParents = (req, res) => {
  Parent.find({})
    .then((dbParents) => {
      res.json(dbParents);
    })
    .catch((err) => {
      res.json(err);
    });
};

// exports.postCreatParent = (req, res) => {

//   const name = req.body.name;
//   const userName = req.body.userName;
//   const password = req.body.password;
//   const emailAdress = req.body.emailAdress;
//   const telepohoneNumber = req.body.telepohoneNumber;
//   const numberOfChildren = req.body.numberOfChildren;
//   const state = "Parent"

//   bcrypt
//     .hash(password, 12)
//     .then(hashedPw => {
//       const parent = new Parent({
//         name: name,
//         userName: userName,
//         password: hashedPw,
//         emailAdress: emailAdress,
//         telepohoneNumber: telepohoneNumber,
//         numberOfChildren: numberOfChildren,
//         state: state
//       });
//       return parent.save();
//     })
//     .then(result => {
//       res.status(201).json({ message: 'Parent created!', parentId: result._id });
//     })

// };
exports.getParentInfo = (req, res, next) => {
  const parent_id = req.params._id;
  Parent.findOne({ _id: parent_id })
    .populate({
      path: "allStudents",
      select: "studentName image dateOfBirth class teacher_id studentLevelRate"
    })
    .then((parent) => {
      res
        .status(200)
        .json({ parentName: parent.parentName, students: parent.allStudents });
    })
    .catch((err) => {
      return res.status(404).json({
        message: "the parent s' student is not defined"
      });
    });
};
exports.getstudentInfo = (req, res, next) => {
  const student_id = req.params._id;
  Student.find({ _id: student_id })
    .then((student) => {
      return res.status(200).json({
        absence: student.absence,
        note: student.note,
        dalyRate: student.dalyRate
      });
    })
    .catch((err) => console.log(err));
};
exports.poststudentMarks = (req, res, next) => {
  const student_id = req.pareams._id;
  const typeExam = req.body.type;
  student
    .find({ _id: student_id })
    .then((student) => {
      if (typeExam === "first") {
        if (student.typeExam.first.existFirst) {
          return res.status(200).json({ marks: student.typeExam.first });
        } else {
          return res
            .status(201)
            .json({ message: "Exam marks have not been add yet" });
        }
      }
      if (typeExam === "secound") {
        if (student.typeExam.secound.existSecound) {
          return res.status(200).json({ marks: student.typeExam.secound });
        } else {
          return res
            .status(201)
            .json({ message: "Exam marks have not been add yet" });
        }
      }
      if (typeExam === "final") {
        if (student.typeExam.final.existFinal) {
          return res.status(200).json({ marks: student.typeExam.final });
        } else {
          return res
            .status(201)
            .json({ message: "Exam marks have not been add yet" });
        }
      }
    })
    .catch((err) => console.log(err));
};

exports.getNumberOfAllParents = (req, res) => {
  Parent.find({})
    .then((dbParents) => {
      return res.json(dbParents.length);
    })
    .catch((err) => {
      res.json(err);
    });
};
