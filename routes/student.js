const express = require("express");

const router = express.Router();

const studentController = require("../controllers/student");

// product and Student
router.get("/students", studentController.getAllStudents);

// Route for retrieving a Parent by id and populating it's Student.
//router.get("/parents/:id", studentController.getPobulateStudent);

// Route for retrieving a Teacher by id and populating it's Student.
// router.get("/teachers/:id", studentController.getPobulateStudentsForTeacher);

// here put /student and id for his father
router.all(
  "/student/:id",
  studentController.creatStudentAndPutHimInCurrentTeacherAndParent
);

router.get("/getNumberOfAllStudents", studentController.getNumberOfAllStudents);

router.post("/absence/:id", studentController.posAbsence);

router.post("/addSubjectDetails/:id", studentController.addSubjectDetails);

//should delete it later
//create dammy student
// router.post('/addStudent', studentController.addStudent)
// router.post('/addStudent', studentController.addStudent)

// //shoud delete this middleware later
// //delete all from DB
// const Parent = require("../models/parent");
// const Student = require("../models/student");
// const Teacher = require("../models/teacher");
// router.post("/delete", (req, res) => {
//   // Parent.deleteMany({}).then(() => {
//   //   console.log("Parents deleted successfully"); // Success
//   // });
//   Student.deleteMany({}).then(() => {
//     console.log("Students deleted successfully"); // Success
//   });
//   // Teacher.deleteMany({}).then(() => {
//   //   console.log("Teachers deleted successfully"); // Success
//   // });
// });

// router.post('/student',studentController.creatStudent)

module.exports = router;
