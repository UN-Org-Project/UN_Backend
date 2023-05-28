const express = require("express");

const router = express.Router();

const studentController = require("../controllers/student");

// product and Student
router.get("/students", studentController.getAllStudents);

router.all(
  "/student/:id",
  studentController.creatStudentAndPutHimInCurrentTeacherAndParent
);

router.get("/getNumberOfAllStudents", studentController.getNumberOfAllStudents);
router.post("/absence/:id", studentController.posAbsence);
router.post("/addSubjectDetails/:id", studentController.addSubjectDetails);
module.exports = router;
