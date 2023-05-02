const Teacher = require("../models/teacher");
const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const student = require("../models/student");
const mongoose = require("mongoose");
const lodash = require("lodash");

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
  const body = req.body.studentsData;
  Teacher.findOne({ _id: "64503c4d6a91908b55655014" })
    .then((dbTeacher) => {
      dbTeacher
        .populate({
          path: "allStudents"
        })
        .then((dbTeacher) => {
          dbTeacher.allStudents.forEach((student, index) => {
            student.absence.push({
              absecnceState: body[index].absence
            });
            student.notes.push({
              note: body[index].note
            });

            student.dalyRate.push({
              star: body[index].level
            });
            getStudentLevelRate(student._id);
            student.save();
          });
          dbTeacher.save();
        })
        .then(() => {
          res.json("add successfully");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

getStudentLevelRate = (id) => {
  let sum = 0;
  let numOfStars = 0;
  Student.findOne({ _id: id })
    .then((dbStudent) => {
      dbStudent.dalyRate.forEach((s) => {
        numOfStars++;
        return (sum += s.star);
      });

      sum /= numOfStars;
      sum *= 20;
      dbStudent.studentLevelRate = Math.trunc(sum);
      dbStudent.save();
    })

    .catch((err) => {
      console.log(err);
    });
};

//total absences

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
  const body = req.body.studentsMark;
  Teacher.findOne({ _id: "64503c4d6a91908b55655014" })
    .then((dbTeacher) => {
      dbTeacher
        .populate({
          path: "allStudents"
        })
        .then((dbTeacher) => {
          dbTeacher.allStudents.forEach((student, index) => {
            const mark = body[index].marks;
            const note = body[index].note;
            const level = body[index].level;
            Student.findOne({ _id: student._id }).then((dbStudent) => {
              const firstSubjects = dbStudent.typeExam.first.subjects;
              const secondSubjects = dbStudent.typeExam.second.subjects;
              const finalSubjects = dbStudent.typeExam.final.subjects;
              if (body[index].exame == "First") {
                if (body[index].subject == "math") {
                  firstSubjects.math.mark = mark;
                  firstSubjects.math.note = note;
                  firstSubjects.math.star = level;
                }

                if (body[index].subject == "english") {
                  firstSubjects.english.mark = mark;
                  firstSubjects.english.note = note;
                  firstSubjects.english.star = level;
                }
                if (body[index].subject == "arbic") {
                  firstSubjects.arbic.mark = mark;
                  firstSubjects.arbic.note = note;
                  firstSubjects.arbic.star = level;
                }
                if (body[index].subject == "history") {
                  firstSubjects.history.mark = mark;
                  firstSubjects.history.note = note;
                  firstSubjects.history.star = level;
                }
                if (body[index].subject == "science") {
                  firstSubjects.science.mark = mark;
                  firstSubjects.science.note = note;
                  firstSubjects.science.star = level;
                }
              } else if (body[index].exame == "Second") {
                if (body[index].subject == "math") {
                  secondSubjects.math.mark = mark;
                  secondSubjects.math.note = note;
                  secondSubjects.math.star = level;
                }

                if (body[index].subject == "english") {
                  secondSubjects.english.mark = mark;
                  secondSubjects.english.note = note;
                  secondSubjects.english.star = level;
                }
                if (body[index].subject == "arbic") {
                  secondSubjects.arbic.mark = mark;
                  secondSubjects.arbic.note = note;
                  secondSubjects.arbic.star = level;
                }
                if (body[index].subject == "history") {
                  secondSubjects.history.mark = mark;
                  secondSubjects.history.note = note;
                  secondSubjects.history.star = level;
                }
                if (body[index].subject == "science") {
                  secondSubjects.science.mark = mark;
                  secondSubjects.science.note = note;
                  secondSubjects.science.star = level;
                }
              } else if (body[index].exame == "Final") {
                if (body[index].subject == "math") {
                  finalSubjects.math.mark = mark;
                  finalSubjects.math.note = note;
                  finalSubjects.math.star = level;
                }

                if (body[index].subject == "english") {
                  finalSubjects.english.mark = mark;
                  finalSubjects.english.note = note;
                  finalSubjects.english.star = level;
                }
                if (body[index].subject == "arbic") {
                  finalSubjects.arbic.mark = mark;
                  finalSubjects.arbic.note = note;
                  finalSubjects.arbic.star = level;
                }
                if (body[index].subject == "history") {
                  finalSubjects.history.mark = mark;
                  finalSubjects.history.note = note;
                  finalSubjects.history.star = level;
                }
                if (body[index].subject == "science") {
                  finalSubjects.science.mark = mark;
                  finalSubjects.science.note = note;
                  finalSubjects.science.star = level;
                }
              }
              dbStudent.save();
            });
          });
        });
      dbTeacher.save();
    })
    .then(() => {
      res.json("added marks successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.sendInfo = (req, res, next) => {
  const id = req.params.id;
  Teacher.findOne({ _id: id })
    .then((dbTeacher) => {
      if (!dbTeacher) {
        console.log("no Teacher");
      }
      return dbTeacher
        .populate({
          path: "allStudents",
          select:
            "_id studentName gender  dateOfBirth parent_id class teacher_id dalyRate studentLevelRate absence"
        })
        .then((dbTeacher) => {
          console.log(dbTeacher);
          res.json(dbTeacher);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// exports.sendInfo = (req, res, next) => {
//   const id = req.params.id;
//   Teacher.findOne({ _id: id })
//     .then((dbTeacher) => {
//       if (!dbTeacher) {
//         console.log("no Teacher");
//       }
//       return dbTeacher
//         .populate({
//           path: "allStudents",
//           select: "_id studentName gender  dateOfBirth parent_id class teacher_id dalyRate"

//         })
//         .then((dbTeacher) => {
//           console.log(dbTeacher);
//           res.json(dbTeacher);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// };

exports.getArrayofNotes = (req, res, next) => {
  const id = req.params.id;
  Teacher.findOne({ _id: id })
    .then((teacher) => {
      return res.json({ notes: teacher.allNotes, id: id });
    })
    .catch((err) => console.log(err));
  // return res.json({ notes: notes, id: id });
};
exports.addNotes = (req, res, next) => {
  const id = req.params.id;
  const updateNotes = req.body.note;

  Teacher.findOne({ _id: id })
    .then((teacher) => {
      const allNotes = teacher.allNotes;
      let uniqueSet = lodash.uniqBy([...allNotes, ...updateNotes], "id");
      let NewNotes = Array.from(uniqueSet);
      teacher.allNotes = NewNotes;

      teacher.save();
      //    console.log(teacher.allNotes);
      teacher
        .populate({
          path: "allStudents"
        })
        .then((dbTeacher) => {
          const notes = updateNotes[updateNotes.length - 1];
          dbTeacher.allStudents.forEach((student) => {
            student.allNotes.push({
              notes: notes
            });
            student.save();
            //        console.log(student.allNotes);
          });
        })
        .catch((err) => console.log(err));

      return res.json({ notes: teacher.allNotes, id: id });
    })
    .catch((err) => console.log(err));

  //console.log(uniqueSet);
};

exports.deleteNote = (req, res, nex) => {
  const id = req.params.id;
  const noteId = req.body.id;
  Teacher.findOne({ _id: id })
    .then((teacher) => {
      const allNotes = teacher.allNotes;
      teacher.allNotes = allNotes.filter((note) => note.id != noteId);
      teacher.save();
      //    console.log(teacher.allNotes);
      teacher
        .populate({
          path: "allStudents"
        })
        .then((dbTeacher) => {
          dbTeacher.allStudents.forEach((student, index) => {
            student.allNotes = student.allNotes.filter(
              (note) => note.notes.id != noteId
            );
            student.save();
            //        console.log(student.allNotes);
          });
        })
        .catch((err) => console.log(err));
      return res.json({ notes: teacher.allNotes, id: id });
    })
    .catch((err) => {
      console.log(err);
    });
  // notes = notes.filter((note) => note.id != noteId);
  // console.log(notes);
};
