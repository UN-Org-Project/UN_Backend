const express = require("express");

const router = express.Router();

const parentController = require("../controllers/parent");
const pdfController = require("../reports/sendPdf");


router.get("/parentInfo/:id", parentController.getParentInfo);

router.post("/getPdfDoc/:id", pdfController.getPdfDoc);

module.exports = router;
