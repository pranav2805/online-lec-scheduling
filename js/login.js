const API = "http://localhost:3000";
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", login);

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

function login(e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  if (usernameInput.value.trim() === "" || passwordInput.value.trim() === "") {
    alert("Please enter values in the fields!!");
    return;
  }

  let loginDetails = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  axios.post(`${API}/login`, loginDetails).then((response) => {
    alert(response.data.message);
    localStorage.setItem("token", response.data.token);
    const decodedToken = parseJwt(response.data.token);
    if (decodedToken.isAdmin) {
      window.location.href = "admin.html";
    } else {
      window.location.href = "instructor.html";
    }
  });
}
