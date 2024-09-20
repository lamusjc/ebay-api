var welcome = document.getElementById('welcome');
var cart_quantity = document.getElementById('cart_quantity');
var file = document.getElementById('file');
var posts_title = document.getElementById('posts_title');
var posts_description = document.getElementById('posts_description');
var posts_price = document.getElementById('posts_price');
var posts_quantity = document.getElementById('posts_quantity');
var message = document.getElementById('message')

info();

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

function sendFiles() {
    var xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file.files[0]);
    formData.append('posts_title', posts_title.value);
    formData.append('posts_description', posts_description.value);
    formData.append('posts_price', posts_price.value);
    formData.append('posts_quantity', posts_quantity.value);

    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            alert(data.message);
            window.location.href = "user.html";
        } else if (xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            alert(data.message);
        }
    }
    xhr.open("POST", "Post", true);
    //    xhr.setRequestHeader("Content-type", "multipart/form-data; boundary=----WebKitFormBoundaryQ0pBuvRC1EzDAQWT");
    //    xhr.withCredentials = true;
    xhr.send(formData);
}

function onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        reader.readAsText(file);
        let ext = file.name.split('.');
        let type = file.type.split('/');
        if (ext.length > 1) {
            if (type[0] == 'image') {
                reader.onload = () => {
                    message.innerText = "Readed Image! Ready for post";
                    //                	alert('Imagen leido');
                }
            } else {
                alert('Solo imagenes');
            }
        } else {
            alert('No tiene extension');
        }

        reader.onloadstart = () => {
            message.innerText = "Reading";
            //            alert('Leyendo');
        }

        reader.onerror = () => {
            alert('Error cargando archivo')
        }
    }
}