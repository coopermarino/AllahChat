
function logout() {
    sessionStorage.clear();
    window.location.replace("login.html");
    alert("Successfully Logged Out")
  }

document.getElementById("logout-button").addEventListener("click", logout);