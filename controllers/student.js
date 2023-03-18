const Parent = require("../models/parent");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

//create student in DB and put him in the correct teacher and put him in the correct parent
//need to put student information as json in body json for the request
//need id for spacifice parent
exports.creatStudentAndPutHimInCurrentTeacherAndParent = (req, res) => {
  const studentClass = req.body.class;
  Teacher.find({})
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
          // //to add absence later
          //  dbStudent.absence.push({
          //   absecnceState: "absence"
          //  })

          //  dbStudent.absence.push({
          //   absecnceState: "absence"
          //  })

          // //to add notes later
          // dbStudent.notes.push({
          //     note: "This is not 1"
          //   })
          //   dbStudent.notes.push({
          //     note: "This is not 2"
          //   })

          // //to add dalyRate later
          // dbStudent.dalyRate.push({
          //   stare: 2
          // })
          // dbStudent.dalyRate.push({
          //   stare: 4
          // })

          // //to add TotlaRate later
          // dbStudent.totalRate = 75;

          // //to add type exam datails
          // dbStudent.typeExam.push({
          //   first: {
          //     subjects: {
          //       math: {
          //         mark: 60,
          //         note: "this is math note",
          //         rate: "this is  math rate",
          //       },
          //       arbic: {
          //         mark: 60,
          //         note: "this is math note",
          //         rate: "this is  math rate",
          //       },
          //       history: {
          //         mark: 60,
          //         note: "this is math note",
          //         rate: "this is  math rate",
          //       },
          //     },
          //   },
          //   second: {
          //     subjects: {
          //       math: {
          //         mark: 80,
          //         note: "this is math note",
          //         rate: "this is  math rate",
          //       },
          //       arbic: {
          //         mark: 90,
          //         note: "this is math note",
          //         rate: "this is  math rate",
          //       },
          //       history: {
          //         mark: 60,
          //         note: "this is math note",
          //         rate: "this is  math rate",
          //       },
          //     },
          //   },
          //   final: {
          //     subjects: {
          //       math: {
          //         mark: 60,
          //         note: "this is math note",
          //         rate: "this is  math rate",
          //       },
          //       arbic: {
          //         mark: 60,
          //         note: "this is math note",
          //         rate: "this is  math rate",
          //       },
          //       history: {
          //         mark: 60,
          //         note: "this is math note",
          //         rate: "this is  math rate",
          //       },
          //     },
          //   },
          // });







          
          //put student in correct teacher
          await Teacher.findOneAndUpdate(
            { _id: idTeacher },
            { $push: { allStudents: dbStudent } },
            { new: true }
          );
          //put student in correct parent
           await Parent.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { allStudents: dbStudent } },
            { new: true }
          )
            Student.updateOne({name:'yyy'}).then(dbStudent => {
              dbStudent.name = 'updated'
            })
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

//need fixing
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
