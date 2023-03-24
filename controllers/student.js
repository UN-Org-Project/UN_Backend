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
          // // maby delte later
          // dbStudent.subjects.push({
          //   subject: "History",
          //   mark: "70",
          //   note: "this is note",
          //   level: 2,
          // });
          // dbStudent.subjects.push({
          //   subject: "Math",
          // });

          // dbStudent.subjects.push({
          //   subject: "English",
          // });

          //

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

//NOt Used now

// exports.getPobulateStudent = (req, res) => {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our ..
//   Parent.findOne({ _id: req.params.id })
//     // ..and populate all of the notes associated with it
//     .populate("students")
//     .then((dbParent) => {
//       // If we were able to successfully find an Parent with the given id, send it back to the client
//       res.json(dbParent);
//     })
//     .catch((err) => {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// };

//NOt Used now
// exports.getPobulateStudentsForTeacher = (req, res) => {
//   Teacher.findOne({ _id: req.params.id })
//     .populate("students")
//     .then((dbTeacher) => {
//       res.json(dbTeacher);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// };

//Should delete later
// exports.creatStudent = (req, res) => {
//   Student.create(req.body)
//     .then((dbStudents) => {
//       dbStudents.subjects.push({
//         subject: "History",
//       });
//       dbStudents.subjects.push({
//         subject: "Math",
//       });

//       dbStudents.subjects.push({
//         subject: "English",
//       });

//       dbStudents.save();
//       return res.json(dbStudents);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// };

//shoud delete later
// exports.addStudent = (req, res) => {
//   //const { studentName, Gender, image, dateOfBirth, className } = req.body;

//   Student.create(req.body).then((dbStudent) => {
//     dbStudent.typeExam.first.subjects.math.mark = "Not avalibale yet!";
//      dbStudent.typeExam.first.subjects.math.note ="Not avalibale yet!";
//      dbStudent.typeExam.first.subjects.math.rate ="Not avalibale yet!";

//     dbStudent.typeExam.first.subjects.english.mark ="Not avalibale yet!";
//     dbStudent.typeExam.first.subjects.english.note ="Not avalibale yet!";
//     dbStudent.typeExam.first.subjects.english.rate ="Not avalibale yet!";

//     dbStudent.typeExam.first.subjects.arbic.mark ="Not avalibale yet!";
//     dbStudent.typeExam.first.subjects.arbic.note ="Not avalibale yet!";
//     dbStudent.typeExam.first.subjects.arbic.rate ="Not avalibale yet!";

//     return dbStudent.save().then(res.json("student created successfully"));
//   });
// };
