window.onload=function() {
	function getData(url, displayTodo);

var displayTodo = function() {

console.log("inside displayTodo function");

};

};


function getData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onreadystatechange = function() {
        if (xhr.status < 400 && xhr.readyState == 4) {
            console.log(xhr.responseText);
            callback(JSON.parse(xhr.responseText).data);
        }
    };

    xhr.send(null);
}

function verbData(method, url, callback, obj) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (obj) {
        xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onreadystatechange = function() {
        if (xhr.status < 400 && xhr.readyState == 4) {
            console.log(xhr.responseText);
            if (callback) {
                callback(JSON.parse(xhr.responseText).data);
            }
        }
    };

    if (obj) {
        xhr.send(JSON.stringify(obj));
    } else {
        xhr.send(null);
    }
}


