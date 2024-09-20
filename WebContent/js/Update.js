var nameuser = document.getElementById('nameuser');
var lastname = document.getElementById('lastname');
var phone = document.getElementById('phone');
var username = document.getElementById('username');
var welcome = document.getElementById('welcome');
var cart_quantity = document.getElementById('cart_quantity');

info();

function info() {
  var xhr = new XMLHttpRequest();
  // var arr = [];
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      welcome.innerText = data.message;
      cart_quantity.setAttribute("data-count", data.cart_quantity);
      Object.keys(data.data).forEach(function (key) {
        // arr.push(data.data[key]);
        nameuser.value = data.data[key].name;
        lastname.value = data.data[key].lastname;
        phone.value = data.data[key].phone;
        username.value = data.data[key].username;
      });
      // console.log(arr);
    } else if (xhr.status === 401 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'index.html';
    } else if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'index.html';
    }
  }
  xhr.open("GET", "Info", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
}

function Update() {
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
  var params = "name=" + nameuser.value + "&lastname=" + lastname.value + "&phone=" + phone.value + "" +
    "&username=" + username.value;
  xhr.open("POST", "Update", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
}

function Delete() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'index.html';
    }
  }
  xhr.open("GET", "Delete", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
}

function logout() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'index.html';
    }
  }
  xhr.open("GET", "Logout", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
}

function back() {
  window.location.href = "user.html";
}