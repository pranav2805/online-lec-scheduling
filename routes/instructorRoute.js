const express = require("express");

const router = express.Router();

const instructorController = require("../controllers/instructorCont");

router.get("/getLectures", instructorController.getLectures);

module.exports = router;
