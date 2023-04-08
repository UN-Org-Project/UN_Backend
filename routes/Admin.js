const express = require("express");
const router = express.Router();
const adminControler = require("../controllers/Admin");

//Add astatic Admin
router.post("/admin", adminControler.addAdmin);
router.post("/parent", adminControler.postCreatParent);
router.post("/teacher", adminControler.postCreatTeacher);
router.get("/getAdmininfo/:id", adminControler.getAdminInfo);

module.exports = router;
