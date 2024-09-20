var welcome = document.getElementById('welcome');
var cart_quantity = document.getElementById('cart_quantity');
var arr = [];

info();
getArticle();

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

function getArticle() {
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
                var img = document.createElement("img");
                var div2 = document.createElement("div");
                var input = document.createElement("input");
                var input2 = document.createElement("input");
                var input3 = document.createElement("input");
                var textarea = document.createElement("textarea");
                var button_edit = document.createElement("button");

                div.setAttribute("class", "card mt-4");
                img.setAttribute("class", "card-img-top img-fluid");
                div2.setAttribute("class", "row card-body");
                input.setAttribute("class", "form-control col-8");
                input.setAttribute("id", "posts_title");
                input.setAttribute("placeholder", "Title");

                input2.setAttribute("class", "form-control col-2");
                input2.setAttribute("id", "posts_price");
                input2.setAttribute("placeholder", "Price");
                input2.setAttribute("type", "number");

                input3.setAttribute("class", "form-control col-2");
                input3.setAttribute("id", "posts_quantity");
                input3.setAttribute("placeholder", "Quantity");
                input3.setAttribute("type", "number");

                textarea.setAttribute("class", "form-control");
                textarea.setAttribute("id", "posts_description");
                textarea.setAttribute("placeholder", "Description");
                textarea.setAttribute("style", "resize:none; height:131px;");

                img.src = arr[x].posts_image;

                input.value = arr[x].posts_title;
                input2.value = arr[x].posts_price;
                input3.value = arr[x].posts_quantity;

                textarea.value = arr[x].posts_description;
                
                button_edit.setAttribute("class", "btn btn-primary");
                button_edit.setAttribute("onclick", "editPost(" + arr[x].posts_id + ")");
                button_edit.textContent = "Edit";
                //Appendchild a los elementos

                div2.appendChild(input);
                div2.appendChild(input2);
                div2.appendChild(input3);
                div2.appendChild(textarea);
                div2.appendChild(button_edit);

                div.appendChild(img);
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
    var url = new URL(window.location.href);
    var posts_id = url.searchParams.get("posts_id");

    xhr.open("GET", "GetArticle?posts_id=" + posts_id, true);
    xhr.send();
}

function editPost(posts_id) {
    var xhr = new XMLHttpRequest();
    var posts_title = document.getElementById('posts_title');
    var posts_price = document.getElementById('posts_price');
    var posts_quantity = document.getElementById('posts_quantity');
    var posts_description = document.getElementById('posts_description');

    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            alert(data.message);
            getArticle();
        } else if (xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            alert(data.message);
        }
    }
    var params = "posts_id="+posts_id+"&posts_title="+posts_title.value+"&posts_price="+posts_price.value+"&posts_quantity="+posts_quantity.value+"&posts_description="+posts_description.value;
    xhr.open("POST", "EditArticle", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}