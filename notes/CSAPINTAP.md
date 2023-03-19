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

      //create student in DB and put him in the correct teacher and put him in the correct parent
      Student.create(req.body)
        .then(async (dbStudent) => {
          //put student in correct teacher
          await Teacher.findOneAndUpdate(
            { _id: idTeacher },
            { $push: { allStudents: dbStudent } },
            { new: true }
          );
          //put student in correct parent
          return await Parent.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { allStudents: dbStudent } },
            { new: true }
          );
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

         // dbStudent.save();

