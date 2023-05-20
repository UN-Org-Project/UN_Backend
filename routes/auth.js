const express = require("express");
//const { body } = require('express-validator/check');

const Teacher = require("../models/teacher");
const authController = require("../controllers/auth");

const router = express.Router();

router.put("/login", authController.login);
router.post("/Info/:id", authController.AuthChating);

module.exports = router;
