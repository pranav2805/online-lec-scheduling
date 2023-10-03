const Lecture = require("../models/lecture");
const Instructor = require("../models/instructor");
const Schedule = require("../models/schedule");
const { Op } = require("sequelize");
const Course = require("../models/course");

exports.postLecture = async (req, res) => {
  try {
    const instId = req.body.instructorId;
    const date = req.body.date;
    const courseId = req.body.courseId;
    console.log(date);
    const schedules = await Schedule.findAll({
      include: [
        {
          model: Lecture,
          where: {
            instructorId: instId,
            date: {
              [Op.eq]: date,
            },
          },
        },
      ],
    });
    console.log(schedules.length);
    if (schedules.length === 0) {
      const lecture = new Lecture({
        date: new Date(date),
        courseId: courseId,
        instructorId: instId,
      });
      await lecture.save();
      //   let lectureObj = { ...lecture };
      const courseName = await Course.findOne({
        attributes: ["name"],
        where: {
          id: courseId,
        },
      });

      const instructorName = await Instructor.findOne({
        attributes: ["name"],
        where: {
          id: instId,
        },
      });
      //   console.log("BE>>>", lecture);
      await Schedule.create({ lectureId: lecture.dataValues.id });

      let lectureObj = {
        date: lecture.date,
        courseId: lecture.courseId,
        instructorId: lecture.instructorId,
        courseName: courseName.name,
        instructorName: instructorName.name,
      };

      res.status(200).json(lectureObj);
    } else {
      throw new Error("Lecture already scheduled for this instructor");
    }
  } catch (error) {
    console.log("errr>>>", error.message);
    res.status(500).json({ err: error.message });
  }
};

exports.getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.findAll();
    res.status(200).json(lectures);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
