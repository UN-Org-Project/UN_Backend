const express = require("express");
const router = express.Router();
const adminControler = require("../controllers/Admin");

//Add astatic Admin
router.post("/admin", adminControler.addAdmin);
router.put("/parent", adminControler.postCreatParent);
router.put("/teacher", adminControler.postCreatTeacher);
router.get("/getAdmininfo/:id", adminControler.getAdminInfo);
router.get("/getAllStudents", adminControler.getAllStudents);
router.get("/getAllTeachers", adminControler.getAllTeachers);
router.get("/deleteStudent/:id", adminControler.deleteStudent);
router.get("/deleteTeacher/:id", adminControler.deleteTeacher);
router.post("/sendStudentInfo/:id", adminControler.sendStudentInfo);
router.post("/sendTeacherInfo/:id", adminControler.sendTeacherInfo);
module.exports = router;
