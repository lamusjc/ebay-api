var nameuser = document.getElementById('nameuser');
var lastname = document.getElementById('lastname');
var phone = document.getElementById('phone');
var username = document.getElementById('username');
var password = document.getElementById('password');
var id_user = document.getElementById('id_user');

function Register() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'index.html';
    } else if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
    }
  }
  var params = "name=" + nameuser.value + "&lastname=" + lastname.value + "&phone=" + phone.value + "" +
    "&username=" + username.value + "&id_users=" + id_users.value + "&id_roles=1" + "&password=" + password.value;
  xhr.open("POST", "Register", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
}

function Index() {
  window.location.href = 'index.html';
}