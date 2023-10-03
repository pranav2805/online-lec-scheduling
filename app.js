const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const courseRoutes = require("./routes/courseRoute");
const lectureRoutes = require("./routes/lectureRoute");
const instructorRoutes = require("./routes/instructorRoute");
const userRoutes = require("./routes/userRoute");
const sequelize = require("./util/database");
const Course = require("./models/course");
const Instructor = require("./models/instructor");
const Lecture = require("./models/lecture");
const Schedule = require("./models/schedule");
const User = require("./models/user");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

Course.hasMany(Lecture);
Lecture.belongsTo(Course);

Instructor.hasMany(Lecture);
Lecture.belongsTo(Instructor);

Lecture.hasOne(Schedule);
Schedule.belongsTo(Lecture);

// Instructor.hasMany(Schedule);
// Schedule.belongsTo(Instructor);

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoutes);
app.use("/course", courseRoutes);
app.use("/lecture", lectureRoutes);
app.use("/instructor", instructorRoutes);

// sequelize
//   .sync({ force: true })
sequelize.sync().then((result) => {
  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
});
