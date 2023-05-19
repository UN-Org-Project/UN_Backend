const Parent = require("../models/parent");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

//create student in DB and put him in the correct teacher and put him in the correct parent
//need to put student information as json in body json for the request
//need id for spacifice parent
exports.creatStudentAndPutHimInCurrentTeacherAndParent = (req, res) => {
  const studentClass = req.body.class;
  Teacher.find({ class: studentClass })
    .then((dbTeachers) => {
      // this for to get id for the current teacher
      for (
        var CounterOnTeachers = 0;
        CounterOnTeachers < dbTeachers.length;
        CounterOnTeachers++
      ) {
        if (dbTeachers[CounterOnTeachers].class === studentClass) {
          var idTeacher = dbTeachers[CounterOnTeachers]._id;
        }
      } // END FOR AND GOT ID for TEACHER

      Student.create(req.body)
        .then(async (dbStudent) => {
 //put student in correct teacher
          await Teacher.findOneAndUpdate(
            { _id: idTeacher },
            { $push: { allStudents: dbStudent._id } },
            { new: true }
          );
          //put student in correct parent
          await Parent.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { allStudents: dbStudent._id } },
            { new: true }
          );
          dbStudent.save();
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .then(() => {
      res.json("Add Student to current teacher and parent successfully");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.posAbsence = (req, res) => {
  const studentId = req.params.id;
  const bodyinfo = req.body;
  Student.findById(studentId)
    .then((dbStudent) => {
      dbStudent.absence.push(bodyinfo);
      dbStudent.save();
      res.json(`Abcence information added successfully`);
    })
    .catch((err) => {
      res.json(err);
    });
};

//delete later
exports.addSubjectDetails = (req, res) => {
  const studentId = req.params.id;
  const bodyinfo = req.body;
  Student.findById(studentId)
    .then((dbStudent) => {
      //      dbStudent.subjects.subject.push(bodyinfo);
      dbStudent.save();
      res.json(`Marks details added successfully`);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getAllStudents = (req, res) => {
  Student.find({})
    .then((dbStudents) => {
      res.json(dbStudents);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getNumberOfAllStudents = (req, res) => {
  Student.find({})
    .then((dbStudents) => {
      return res.json(dbStudents.length);
    })
    .catch((err) => {
      res.json(err);
    });
};
