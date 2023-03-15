const Teacher = require("../models/teacher");
const bcrypt = require('bcryptjs');

exports.getAllTeachers = (req, res, next) => {
  Teacher.find({})
    .then((dbTeachers) => {
      res.json(dbTeachers);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.postCreatTeacher = (req, res) => {
  const name = req.body.name;
  const userName = req.body.userName;
  const password = req.body.password;
  const emailAdress = req.body.emailAdress;
  const telepohoneNumber = req.body.telepohoneNumber;
  const gender = req.body.gender;
  const image = req.body.image;
  const _class = req.body.class;
  const dateOfBirth = req.body.dateOfBirth;
  const state = "Teacher";

  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
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
      return teacher.save();
    })
    .then(result => {
      res.status(201).json({ message: 'Teacher created!', teacherId: result._id });
    })
};



exports.getNumberOfAllTeachers = (req, res) => {
  Teacher.find({})
    .then((dbTeachers) => {
      return res.json(dbTeachers.length);
    })
    .catch((err) => {
      res.json(err);
    });
};
