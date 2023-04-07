const express = require("express");

const router = express.Router();

const parentController = require("../controllers/parent");

// Route for creating a new Parent
//router.post("/parent",parentController.postCreatParent);

// Route to get all Parents
//router.get("/parents", parentController.getAllParents);

//router.get("/getNumberOfAllParents", parentController.getNumberOfAllParents);
router.get("/parentinfo/:_id", parentController.getParentInfo);
router.get("/studentInfo/:_id", parentController.getstudentInfo);
module.exports = router;
