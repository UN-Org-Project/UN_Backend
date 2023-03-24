const express = require("express");

const router = express.Router();

const parentController = require("../controllers/parent");
const pdfController = require("../reports/sendPdf");

// Route for creating a new Parent
//router.post("/parent",parentController.postCreatParent);

// Route to get all Parents
router.get("/parents", parentController.getAllParents);

router.get("/getNumberOfAllParents", parentController.getNumberOfAllParents);

router.get('/getPdfDoc',pdfController.getPdfDoc)

module.exports = router;
