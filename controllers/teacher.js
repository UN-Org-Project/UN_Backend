const Teacher = require("../models/teacher");
const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const student = require("../models/student");

exports.getAllTeachers = (req, res, next) => {
  Teacher.find({})
    .then((dbTeachers) => {
      res.json(dbTeachers);
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

// from here
exports.add_Abs_Note_Rate = (req, res, next) => {
  const absence = req.body.absence;
  const note = req.body.note;
  const star = req.body.rate;

  Student.findOne({ _id: "641f86931b84d5b8d28ad010" })
    //here if we add a new absence should we call getTotalRate ?
    .then((dbStudent) => {
      dbStudent.absence.push({
        absecnceState: absence,
      });
      dbStudent.notes.push({
        note: note,
      });
      dbStudent.dalyRate.push({
        star: star,
      });
      dbStudent.save();
    })
    .then((result) => {
      res.json("added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

// see later
exports.getStudentLevelRate = (req, res, next) => {
  let sum = 0;
  let numOfStars = 0;
  Student.findOne({ _id: "641f86931b84d5b8d28ad010" })
    .then((dbStudent) => {
      // studentLevelRate = dbStudent.dalyRate[0].star
      dbStudent.dalyRate.forEach((s) => {
        numOfStars++;
        return (sum += s.star);
      });
      sum /= numOfStars;
      sum *= 20;
      dbStudent.studentLevelRate = Math.trunc(sum);
      dbStudent.save();
    })
    .then((result) => {
      res.json("get Student Level Rate successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getTotalStudentAbs = (req, res, next) => {
//   Student.findOne({ _id: "641734f22460cdb8b1de6dc9" })
//   .then(dbStudent => {
//     dbStudent.totalAbsence = dbStudent.absence.length;
//     dbStudent.save();
//   })
//   .then((result) => {
//     res.json("get student absence successfully");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// };

exports.addtypeExam = (req, res, next) => {
  const { type, subject, mark, note, rate } = req.body;
  Student.findOne({ _id: "641f86931b84d5b8d28ad010" })
    .then((dbStudent) => {
      const firstSubjects = dbStudent.typeExam.first.subjects;
      const secondSubjects = dbStudent.typeExam.second.subjects;
      const finalSubjects = dbStudent.typeExam.final.subjects;
      if (type == "first") {
        if (subject == "math") {
          firstSubjects.math.mark = mark;
          firstSubjects.math.note = note;
          firstSubjects.math.rate = rate;
        }

        if (subject == "english") {
          firstSubjects.english.mark = mark;
          firstSubjects.english.note = note;
          firstSubjects.english.rate = rate;
        }
        if (subject == "arbic") {
          firstSubjects.arbic.mark = mark;
          firstSubjects.arbic.note = note;
          firstSubjects.arbic.rate = rate;
        }
      } else if (type == "second") {
        if (subject == "math") {
          secondSubjects.math.mark = mark;
          secondSubjects.math.note = note;
          secondSubjects.math.rate = rate;
        }

        if (subject == "english") {
          secondSubjects.english.mark = mark;
          secondSubjects.english.note = note;
          secondSubjects.english.rate = rate;
        }
        if (subject == "arbic") {
          secondSubjects.arbic.mark = mark;
          secondSubjects.arbic.note = note;
          secondSubjects.arbic.rate = rate;
        }
      } else if (type == "final") {
        if (subject == "math") {
          finalSubjects.math.mark = mark;
          finalSubjects.math.note = note;
          finalSubjects.math.rate = rate;
        }

        if (subject == "english") {
          finalSubjects.english.mark = mark;
          finalSubjects.english.note = note;
          finalSubjects.english.rate = rate;
        }
        if (subject == "arbic") {
          finalSubjects.arbic.mark = mark;
          finalSubjects.arbic.note = note;
          finalSubjects.arbic.rate = rate;
        }
      }
      dbStudent.save();
    })
    .then((result) => {
      res.json("add type exam added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.sendInfo = (req, res, next) => {
  const teacherId = req.params.teacherId;
  Teacher.findOne({ _id: teacherId })
    .then((dbTeacher) => {
      return dbTeacher
        .populate({
          path: "allStudents",
        })
        .then((dbTeacher) => {
          res.json(dbTeacher);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// exports.addAbsence = (req, res, next) => {
//   const absence = req.body.absence;
//   console.log(absence);
//   Student.findOne({ _id: "6416161d9dab8081ba6e746d" })
//     .then((dbStudent) => {
//       dbStudent.absence.push({
//         absecnceState: absence,
//       });
//       dbStudent.save();
//     })
//     .then((result) => {
//       res.json("add absence added successfully");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.addDalyRate = (req, res, next) => {
//   Student.findOne({ _id: "6416161d9dab8081ba6e746d" })
//     .then((dbStudent) => {
//       dbStudent.dalyRate.push({
//         stare: 4,
//       });
//       dbStudent.save();
//     })
//     .then((result) => {
//       res.json("add daly rate added successfully");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
