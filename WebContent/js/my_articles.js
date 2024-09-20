var welcome = document.getElementById('welcome');
var cart_quantity = document.getElementById('cart_quantity');
var arr = [];

info();
myArticles(); 

function info() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      welcome.innerText = data.message;
      cart_quantity.setAttribute("data-count", data.cart_quantity);
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

function myArticles(){
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

      for(var x in arr){
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
        var p = document.createElement("p");
        var button_edit = document.createElement("button");
        var button_delete = document.createElement("button");

        //Asignacion de atributos

        //Div
        div.setAttribute("class", "col-lg-4 col-md-6 mb-4");
        div2.setAttribute("class", "card h-100");
        div3.setAttribute("class", "card-body");

        //a, img
        a.setAttribute("href", "#");
        img.setAttribute("class", "card-img-top");
        //img.setAttribute("style", "height: 169px; width:253px");
        img.src = arr[x].posts_image;
        a2.setAttribute("href", "edit_article.html?posts_id="+arr[x].posts_id);
        a2.textContent = arr[x].posts_title;

        img.setAttribute("onclick", "verImagen('../"+arr[x].posts_image+"', '"+arr[x].posts_image+"')");
        img.setAttribute("data-target", "#ModalImagen");
        img.setAttribute("data-toggle", "modal");


        //h4, h5 y p
        h4.setAttribute("class", "card-title");
        p.setAttribute("class", "card-text");
        button_edit.setAttribute("class", "btn btn-primary");
        button_edit.setAttribute("onclick", "goEdit("+arr[x].posts_id+")");
        button_delete.setAttribute("class", "btn btn-danger");
        button_delete.setAttribute("onclick", "deletePost("+arr[x].posts_id+")");
        h5.textContent = "$" + arr[x].posts_price;
        h6.textContent = "Quantity: " + arr[x].posts_quantity;
        p.textContent = arr[x].posts_description;
        button_edit.textContent = "Edit";
        button_delete.textContent = "Delete";
        //Appendchild a los elementos

        h4.appendChild(a2);
        div3.appendChild(h4);
        div3.appendChild(h5);
        div3.appendChild(h6);
        div3.appendChild(p);
        div3.appendChild(button_edit);
        div3.appendChild(button_delete);
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
  xhr.open("GET", "MyArticles", true);
  xhr.send();
}

function goEdit(posts_id){
    window.location.href = "edit_article.html?posts_id="+posts_id;
}

function deletePost(posts_id){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      myArticles();
    }
  }
  var params = "posts_id="+posts_id;
  xhr.open("POST", "DeletePost", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
}