const Parent = require("../models/parent");
const Teacher = require("../models/teacher");

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
  Teacher.create(req.body)
    .then((dbTeacher) => {
      res.json(dbTeacher);
    })
    .catch((err) => {
      res.json(err);
    });
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
