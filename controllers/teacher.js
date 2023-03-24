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

  Student.findOne({ _id: "641af0a29bce6b7854a85621" })
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
  Student.findOne({ _id: "641af0a29bce6b7854a85621" })
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
  const { type, subject, mark, note, star } = req.body;
  Student.findOne({ _id: "641af0a29bce6b7854a85621" })
    .then((dbStudent) => {
      const firstSubjects = dbStudent.typeExam.first.subjects;
      const secondSubjects = dbStudent.typeExam.second.subjects;
      const finalSubjects = dbStudent.typeExam.final.subjects;

      const mathF = () => {
        firstSubjects.math.mark = mark;
        firstSubjects.math.note = note;
        firstSubjects.math.star = star;
      };
      const englishF = () => {
        firstSubjects.english.mark = mark;
        firstSubjects.english.note = note;
        firstSubjects.english.star = star;
      };
      const arbicF = () => {
        firstSubjects.arbic.mark = mark;
        firstSubjects.arbic.note = note;
        firstSubjects.arbic.star = star;
      };
      const historyF = () => {
        firstSubjects.history.mark = mark;
        firstSubjects.history.note = note;
        firstSubjects.history.star = star;
      };
      const scienceF = () => {
        firstSubjects.science.mark = mark;
        firstSubjects.science.note = note;
        firstSubjects.science.star = star;
      };
      const mathS = () => {
        secondSubjects.math.mark = mark;
        secondSubjects.math.note = note;
        secondSubjects.math.star = star;
      };
      const englishS = () => {
        secondSubjects.english.mark = mark;
        secondSubjects.english.note = note;
        secondSubjects.english.star = star;
      };
      const arbicS = () => {
        secondSubjects.arbic.mark = mark;
        secondSubjects.arbic.note = note;
        secondSubjects.arbic.star = star;
      };
      const historyS = () => {
        secondSubjects.history.mark = mark;
        secondSubjects.history.note = note;
        secondSubjects.history.star = star;
      };
      const scienceS = () => {
        secondSubjects.science.mark = mark;
        secondSubjects.science.note = note;
        secondSubjects.science.star = star;
      };

      const mathFinal = () => {
        finalSubjects.math.mark = mark;
        finalSubjects.math.note = note;
        finalSubjects.math.star = star;
      };
      const englishFinal = () => {
        finalSubjects.english.mark = mark;
        finalSubjects.english.note = note;
        finalSubjects.english.star = star;
      };
      const arbicFinal = () => {
        finalSubjects.arbic.mark = mark;
        finalSubjects.arbic.note = note;
        finalSubjects.arbic.star = star;
      };
      const historyFinal = () => {
        finalSubjects.history.mark = mark;
        finalSubjects.history.note = note;
        finalSubjects.history.star = star;
      };
      const scienceFinal = () => {
        finalSubjects.science.mark = mark;
        finalSubjects.science.note = note;
        finalSubjects.science.star = star;
      };

      const EqualFirstSubj = () => {
        if (subject == "math") mathF();
        if (subject == "english") englishF();
        if (subject == "arbic") arbicF();
        if (subject == "history") historyF();
        if (subject == "science") scienceF();
      };
      const EqualSecondSubj = () => {
        if (subject == "math") mathS();
        if (subject == "english") englishS();
        if (subject == "arbic") arbicS();
        if (subject == "history") historyS();
        if (subject == "science") scienceS();
      };
      const EqualFinalSubj = () => {
        if (subject == "math") mathFinal();
        if (subject == "english") englishFinal();
        if (subject == "arbic") arbicFinal();
        if (subject == "history") historyFinal();
        if (subject == "science") scienceFinal();
      };

      if (type == "first") {
        EqualFirstSubj();
      } else if (type == "second") {
        EqualSecondSubj();
      } else if (type == "final") {
        EqualFinalSubj();
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

