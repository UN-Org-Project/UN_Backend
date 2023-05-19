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
module.exports = router;
