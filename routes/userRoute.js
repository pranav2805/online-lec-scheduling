const express = require("express");

const router = express.Router();

const userController = require("../controllers/userCont");

router.post("/login", userController.login);

module.exports = router;
