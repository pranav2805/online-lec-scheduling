const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseCont");

router.get("/getCourses", courseController.getCourses);

router.post("/addCourse", courseController.postCourse);

module.exports = router;
