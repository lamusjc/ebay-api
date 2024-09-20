var welcome = document.getElementById('welcome');
var cart_quantity = document.getElementById('cart_quantity');

var comments_descripcion_edit = document.getElementById("comments_descripcion_edit");
var comments_id_edit = null;

var global_id = null;
var arr = [];
var comments = [];

info();

function info() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            welcome.innerText = data.message;
            cart_quantity.setAttribute("data-count", data.cart_quantity);
            global_id = data.id_users;
            getArticle();
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
    comments_descripcion_edit.textContent = '';
    comments_id_edit = null;
    arr = [];
    comments = [];
    var damelotodo = document.getElementById("damelotodo");
    var commentarios = document.getElementById("commentarios");
    damelotodo.innerHTML = "";
    commentarios.innerHTML = "";

    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            Object.keys(data.data).forEach(function (key) {
                arr.push(data.data[key]);
            });

            Object.keys(data.comments).forEach(function (key) {
                comments.push(data.comments[key]);
            });

            for (var x in arr) {
                //Creación de elementos
                var div = document.createElement("div");
                var img = document.createElement("img");
                var div2 = document.createElement("div");
                var h3 = document.createElement("h3");
                var h4 = document.createElement("h4");
                var h6 = document.createElement("h6");
                var p = document.createElement("p");
                var textarea = document.createElement("textarea");
                var button = document.createElement("button");

                div.setAttribute("class", "card mt-4");
                img.setAttribute("class", "card-img-top img-fluid");
                div2.setAttribute("class", "card-body");
                h3.setAttribute("class", "card-title");
                p.setAttribute("class", "card-text");
                button.setAttribute("class", "btn btn-success");
                button.setAttribute("onclick", "comment(" + arr[x].posts_id + ")");
                textarea.setAttribute("class", "form-control");
                textarea.setAttribute("id", "comments_descripcion");
                textarea.setAttribute("placeholder", "Here your comment. . .");
                textarea.setAttribute("style", "resize:none; height:131px;");

                img.src = arr[x].posts_image;
                h3.textContent = arr[x].posts_title;
                h4.textContent = "$" + arr[x].posts_price;
                h6.textContent = "Quantity: " + arr[x].posts_quantity;
                p.textContent = arr[x].posts_description;
                button.textContent = "Comment";

                //Appendchild a los elementos
                div2.appendChild(h3);
                div2.appendChild(h4);
                div2.appendChild(h6);
                div2.appendChild(p);
                div2.appendChild(textarea);
                div2.appendChild(button);

                div.appendChild(img);
                div.appendChild(div2);
                damelotodo.appendChild(div);
            }

            for (var x in comments) {

                var p = document.createElement("p");
                var small = document.createElement("small");
                var br = document.createElement("br");
                var hr = document.createElement("hr");
                var button = document.createElement("button");
                var button2 = document.createElement("button");

                var today = getToday(comments[x].comments_created_at);
                var time = getTime(comments[x].comments_created_at);

                small.setAttribute("class", "text-muted");
                button.setAttribute("class", "btn btn-primary");
                button.setAttribute("data-toggle", "modal");
                button.setAttribute("data-target", "#modalcommentedit");
                button2.setAttribute("class", "btn btn-danger");

                button.setAttribute("onclick", "asignarValores(" + comments[x].comments_id + ", '" + comments[x].comments_descripcion + "')");
                button2.setAttribute("onclick", "deleteComment(" + comments[x].comments_id + ")");

                p.textContent = comments[x].comments_descripcion;
                small.textContent = "Posted by " + comments[x].id_users + " on " + today + " " + time;
                button.textContent = "Edit";
                button2.textContent = "Delete";

                commentarios.appendChild(p);
                commentarios.appendChild(small);
                commentarios.appendChild(br);
                if (global_id == comments[x].id_users) {
                    commentarios.appendChild(button);
                    commentarios.appendChild(button2);
                }
                commentarios.appendChild(hr);
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
    var params = "posts_id=" + posts_id + "&posts_title=" + posts_title.value + "&posts_price=" + posts_price.value + "&posts_quantity=" + posts_quantity.value + "&posts_description=" + posts_description.value;
    xhr.open("POST", "EditArticle", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}

function comment(posts_id) {
    var xhr = new XMLHttpRequest();

    var comments_descripcion = document.getElementById('comments_descripcion');

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
    var params = "posts_id=" + posts_id + "&comments_descripcion=" + comments_descripcion.value + "&comments_main=true&comments_refer_id=''";
    xhr.open("POST", "Comment", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}

function asignarValores(comments_id, comments_descripcion) {
    comments_id_edit = comments_id;
    comments_descripcion_edit.value = comments_descripcion;
}

function editComment() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            alert(data.message);
            getArticle();
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
    var params = "comments_id=" + comments_id_edit + "&comments_descripcion=" + comments_descripcion_edit.value;
    xhr.open("POST", "EditComment", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}

function deleteComment(comments_id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            alert(data.message);
            getArticle();
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
    var params = "comments_id=" + comments_id;
    xhr.open("POST", "DeleteComment", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}


function getToday(date) {
    var dateFormat = new Date(date);

    var dd = dateFormat.getDate();
    var mm = dateFormat.getMonth() + 1;
    var yyyy = dateFormat.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    var today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function getTime(date) {
    var dateFormat = new Date(date);
    var hours = dateFormat.getHours();
    var minutes = dateFormat.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}