const express = require("express");
//const { body } = require('express-validator/check');

const Teacher = require("../models/teacher");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/login", authController.login);

module.exports = router;
