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