const express = require("express");
const req = require("express/lib/request");
const router = express.Router();

const lectureController = require("../controllers/lectureCont");

router.post("/addLecture", lectureController.postLecture);

router.get("/getLectures");

module.exports = router;
