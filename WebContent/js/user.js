var welcome = document.getElementById('welcome');
var cart_quantity = document.getElementById('cart_quantity');
var arr = [];

var global_id = null;

info();

function info() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      welcome.innerText = data.message;
      cart_quantity.setAttribute("data-count", data.cart_quantity);
      global_id = data.id_users;
      getPosts();
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

function update() {
  window.location.href = 'Update.html';
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

function getPosts() {
  var xhr = new XMLHttpRequest();
  var arr = [];
  var damelotodo = document.getElementById("damelotodo");
  var aca = document.getElementById("aca");
  damelotodo.innerHTML = "";
  aca.innerHTML = "";

  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      Object.keys(data.data).forEach(function (key) {
        arr.push(data.data[key]);
      });

      for (var x in arr) {
        //Creación de elementos
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var div3 = document.createElement("div");
        var a = document.createElement("a");
        var a2 = document.createElement("a");
        var img = document.createElement("img");
        var h4 = document.createElement("h4");
        var h5 = document.createElement("h5");
        var h6 = document.createElement("h6");
        var label = document.createElement("label")
        var select = document.createElement("select");
        var p = document.createElement("p");
        var button = document.createElement("button");

        //Asignacion de atributos
        div.setAttribute("class", "col-lg-4 col-md-6 mb-4");
        div2.setAttribute("class", "card h-100");
        div3.setAttribute("class", "card-body");
        a.setAttribute("href", "#");
        img.setAttribute("class", "card-img-top");
        //img.setAttribute("style", "height: 169px; width:253px");
        a2.setAttribute("href", "detail_article.html?posts_id=" + arr[x].posts_id);
        img.setAttribute("onclick", "verImagen('../" + arr[x].posts_image + "', '" + arr[x].posts_image + "')");
        img.setAttribute("data-target", "#ModalImagen");
        img.setAttribute("data-toggle", "modal");
        h4.setAttribute("class", "card-title");
        p.setAttribute("class", "card-text");
        label.setAttribute("for", "select-" + arr[x].posts_id);
        select.setAttribute("class", "form-control");
        select.setAttribute("id", "select-" + arr[x].posts_id);
        button.setAttribute("class", "btn btn-primary");
        button.setAttribute("onclick", "agregarAlCarrito(" + arr[x].posts_id + ")");

        img.src = arr[x].posts_image;

        a2.textContent = arr[x].posts_title;
        h5.textContent = "$" + arr[x].posts_price;
        h6.textContent = "Quantity: " + arr[x].posts_quantity;
        p.textContent = arr[x].posts_description;
        button.textContent = "Add to cart";

        for (var i = 1; i <= arr[x].posts_quantity; i++) {
          var option = document.createElement("option");
          option.setAttribute("value", i);
          option.value = i;
          option.textContent = "Quantity: " + i;
          select.appendChild(option);
        }

        //Appendchild a los elementos
        h4.appendChild(a2);
        div3.appendChild(h4);
        div3.appendChild(h5);
        if (global_id !== arr[x].id_users) {
          label.appendChild(select);
          div3.appendChild(label);
          div3.appendChild(button);
        } else {
          div3.appendChild(h6);
        }
        div3.appendChild(p);
        a.appendChild(img);
        div2.appendChild(a);
        div2.appendChild(div3);
        div.appendChild(div2);
        damelotodo.appendChild(div);
      }
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
  xhr.open("GET", "GetPosts", true);
  xhr.send();
}

function agregarAlCarrito(posts_id) {
  var xhr = new XMLHttpRequest();
  var select = document.getElementById("select-" + posts_id);

  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      info();
    } else if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
    }
  }
  var params = "posts_id=" + posts_id + "&cart_quantity=" + select.value;
  xhr.open("POST", "PostCart", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
}