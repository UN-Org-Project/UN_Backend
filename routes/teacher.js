const express = require("express");

const router = express.Router();

const teacherController = require("../controllers/teacher");

router.get("/teachers", teacherController.getAllTeachers);

router.post("/teacher", teacherController.postCreatTeacher);

router.get('/getNumberOfAllTeachers',teacherController.getNumberOfAllTeachers)

module.exports = router;
