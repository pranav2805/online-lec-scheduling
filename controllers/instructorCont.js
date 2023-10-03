const Instructor = require("../models/instructor");
const Lecture = require("../models/lecture");

exports.getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.findAll({
      where: {
        instructorId: 1,
      },
      order: [["date", "ASC"]],
    });
    const instructorName = await Instructor.findOne({
      attributes: ["name"],
      where: {
        id: 1,
      },
    });
    res
      .status(200)
      .json({ lectures: lectures, instructorName: instructorName });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
