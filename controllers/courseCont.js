const Course = require("../models/course");
const sequelize = require("../util/database");

exports.postCourse = async (req, res) => {
  try {
    const name = req.body.name;
    const level = req.body.level;
    const desc = req.body.desc;
    const imgURL = req.body.img;

    const course = new Course({
      name: name,
      level: level,
      description: desc,
      imageURL: imgURL,
    });
    await course.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
