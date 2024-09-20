var username = document.getElementById('username');
var password = document.getElementById('password');
info();

function login() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'user.html';
    } else if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
    }
  }

  var params = "username=" + username.value + "&password=" + password.value;
  xhr.open("POST", "Login", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
}

function info() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      window.location.href = 'user.html';
    }
  }
  xhr.open("GET", "Info", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
}


function Register() {
  window.location.href = 'Register.html';
}