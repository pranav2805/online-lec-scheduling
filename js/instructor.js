const API = "http://localhost:3000";
const lectureList = document.getElementById("lecture-list");
const instructorName = document.getElementById("instructorName");

window.addEventListener("DOMContentLoaded", async () => {
  let lectures = await axios.get(`${API}/instructor/getLectures`);
  instructorName.innerHTML = `<h2>Lectures Assigned to ${lectures.data.instructorName.name}`;
  lectures.data.lectures.forEach((lecture) => {
    displayLecture(lecture);
  });
});

function displayLecture(lecture) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>Course:</strong> ${lecture.courseId}  <strong>Date:</strong> ${lecture.date}<br>`;
  lectureList.appendChild(li);
}
