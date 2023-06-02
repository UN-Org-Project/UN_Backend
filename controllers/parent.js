const bcrypt = require("bcryptjs");
const Parent = require("../models/parent");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const mongoose = require("mongoose");
const { getAllStudents } = require("./student");
const student = require("../models/student");

exports.getParentInfo = (req, res, next) => {
  const parent_id = req.params.id;
  Parent.findOne({ _id: parent_id })
    .populate({
      path: "allStudents"
    })
    .then((parent) => {
      parent.allStudents.forEach((student) => {
        student
          .populate({
            path: "teacher_id"
          })
          .then((student) => {
            student.teacherName = student.teacher_id
              ? student.teacher_id.name
              : null;

            student.save();
          });
      });
      res.status(200).json({ parentInfo: parent });
    })
    .catch((err) => {
      return res.status(404).json({
        message: "the parent s' student is not defined"
      }); //
    });
};
