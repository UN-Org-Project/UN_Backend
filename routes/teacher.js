const express = require("express");

const router = express.Router();

const teacherController = require("../controllers/teacher");

router.get("/teachers", teacherController.getAllTeachers);

router.get("/getNumberOfAllTeachers", teacherController.getNumberOfAllTeachers);

// router.post('/addNotes',teacherController.addNotes)
router.post("/add_Abs_Note_Rate", teacherController.add_Abs_Note_Rate);
// router.get('/getTotalStudentAbs',teacherController.getTotalStudentAbs)

// router.get("/getStudentLevelRate", teacherController.getStudentLevelRate);

// router.post('/addAbsence',teacherController.addAbsence)
// router.post('/addDalyRate',teacherController.addDalyRate)
router.post("/addtypeExam", teacherController.addtypeExam);

router.get("/sendInfo/:id", teacherController.sendInfo);
router.get("/getnotes/:id", teacherController.getArrayofNotes);
router.post("/addNotes/:id", teacherController.addNotes);
router.post("/deletNotes/:id", teacherController.deleteNote);

module.exports = router;
