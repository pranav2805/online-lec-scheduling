const API = "http://localhost:3000";

// Sample JavaScript functions for adding courses and lectures
const courseList = document.getElementById("courseList");
const lectureList = document.getElementById("lectureList");

window.addEventListener("DOMContentLoaded", () => {
  getCourses();
  getLectures();
});

async function addCourse() {
  try {
    const courseName = document.getElementById("courseName").value;
    const courseLevel = document.getElementById("courseLevel").value;
    const courseDescription =
      document.getElementById("courseDescription").value;
    const courseImage = document.getElementById("courseImage").value;

    // Create a new course item and add it to the list
    //   if (courseName === "" || courseLevel === "" || courseDescription === "") {
    //     return;
    //   }
    //   const courseItem = document.createElement("li");
    //   courseItem.textContent = `${courseName} (Level: ${courseLevel}) - ${courseDescription}`;
    //   courseList.appendChild(courseItem);

    let courseObj = {
      name: courseName,
      level: courseLevel,
      desc: courseDescription,
      img: courseImage,
    };

    //   console.log(courseObj);

    const course = await axios.post(`${API}/course/addCourse`, courseObj);

    //   console.log(course);
    showCourseOnScreen(course.data);
    showCourseDropdown(course.data);

    // Clear input fields
    document.getElementById("courseName").value = "";
    document.getElementById("courseLevel").value = "";
    document.getElementById("courseDescription").value = "";
    document.getElementById("courseImage").value = "";
  } catch (err) {
    console.log(err);
  }
}

async function getCourses() {
  try {
    const courses = await axios.get(`${API}/course/getCourses`);
    courses.data.forEach((course) => {
      showCourseOnScreen(course);
      showCourseDropdown(course);
    });
  } catch (err) {
    console.log(err);
  }
}

async function addLecture() {
  try {
    const lectureDate = document.getElementById("lectureDate").value;

    //getting instructor id
    const lectureInstructor =
      document.getElementById("lectureInstructor").value;
    const instructorId = localStorage.getItem(lectureInstructor);
    // console.log("instructorId>>>", instructorId);

    //getting course id to send it to the backend
    const courseId = document.getElementById("courses").value;

    // console.log("cousrseId>>>>", courseId);
    // Create a new lecture item and add it to the list
    //   const lectureItem = document.createElement("li");
    //   lectureItem.textContent = `Date: ${lectureDate}, Instructor: ${lectureInstructor}`;
    //   lectureList.appendChild(lectureItem);

    let lectureObj = {
      instructorId: instructorId,
      date: lectureDate,
      instructorName: lectureInstructor,
      courseId: courseId,
    };

    const lecture = await axios.post(`${API}/lecture/addLecture`, lectureObj);

    if (lecture.status === 200) {
      showLectureOnScreen(lecture.data);
    } else {
      //   console.log("hiiiiiiii!!!");
      throw new Error(lecture.err);
    }

    // Clear input fields
    document.getElementById("lectureDate").value = "";
    document.getElementById("lectureInstructor").value = "";
  } catch (err) {
    console.log("errr FE>>>", err);
    // alert(err.response.data.err);
  }
}

async function getLectures() {
  try {
    const lectures = await axios.get(`${API}/lecture/getLectures`);
    lectures.data.forEach((lecture) => {
      showLectureOnScreen(lecture);
    });
  } catch (err) {
    console.log(err);
  }
}

function showCourseOnScreen(course) {
  const courseItem = document.createElement("li");
  courseItem.textContent = `${course.name} (Level: ${course.level}) - ${course.description}`;
  courseList.appendChild(courseItem);
  localStorage.setItem(course.name, course.id);
}

function showCourseDropdown(course) {
  const courseDropdown = document.getElementById("courses");
  const option = document.createElement("option");
  option.value = course.id;
  option.text = course.name;
  courseDropdown.appendChild(option);
}

function showLectureOnScreen(lecture) {
  const lectureItem = document.createElement("li");
  console.log("lectureObj>>>", lecture);
  lectureItem.textContent = `Course: ${lecture.courseName} Instructor: ${lecture.instructorName} Date: ${lecture.date}`;
  lectureList.appendChild(lectureItem);
}
