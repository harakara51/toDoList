console.log("loaded app.js");

 var userSession =false;


window.onload = function() {
    init();

};



var init = function() {

    function getData(url, callback) {
        var xhr = new XMLHttpRequest();


        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {

                console.log("type of object recieved before pasrsing " + typeof(xhr.responseText));
                console.log("inside getData function ln 22" + xhr.response);


                var tasks = JSON.parse(xhr.response);
                console.log("type of object recieved after parsing " + typeof(tasks));
                console.log(tasks);

                if (callback) {
                    callback(tasks);
                }

            }
        };
        xhr.open('GET', url);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(null);
    }

    verbData = function(method, url, callback, obj) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);

        if (obj) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onreadystatechange = function() {
            if (xhr.status < 400 && xhr.readyState == 4) {
                console.log("inside verbData :" + xhr.response);
                userSession = xhr.response;
                userTest = xhr.response;
                if (callback) {
                    callback(xhr.response);
                }
            }
        };

        if (obj) {
            xhr.responseType = 'json';
            console.log("Before hitting route, data is " + obj);
            xhr.send(JSON.stringify(obj));
        } else {
            xhr.send(null);
        }
    }

    console.log("before calling todo route");
     verbData("POST","userSet");
    getData("todos", displayTodo);

  


    function displayTodo(data) {

        console.log("inside displayTodo function and userSession is :" + userSession);

        var todoDiv = document.getElementById("todo");
        todoDiv.innerHTML = " ";
        if (userSession === undefined || userSession === null || userSession === false) {

            console.log("inside if of todo");

            for (var i = 0; i < data.length; i++) {

                var itemcheck = document.createElement("input");

                itemcheck.setAttribute("type", "checkbox");
                itemcheck.setAttribute("name", "isChecked");

                itemcheck.setAttribute("value", data[i]);

                var item1 = document.createElement("li");
                item1.setAttribute("class", "list-group-item");
                item1.innerHTML = "\t" + data[i] + "  \t";
                item1.appendChild(itemcheck);
                todoDiv.appendChild(item1);
            }
        } 
        else {
         console.log("inside else of  display and task is " + data);
            for (var i = 0; i < data.length; i++) {

                
                var itemcheck = document.createElement("input");
                itemcheck.setAttribute("type", "checkbox");
                itemcheck.setAttribute("name", "isChecked");

                itemcheck.setAttribute("value", data[i].id);

                var item1 = document.createElement("li");
                item1.setAttribute("class", "list-group-item");
                item1.innerHTML = "\t" + data[i].task + "  \t";
                item1.appendChild(itemcheck);
                todoDiv.appendChild(item1);
            }
        }
};

var addTask = document.getElementById("addTask");
addTask.addEventListener("click", addTasktoDB);



function addTasktoDB() {

    console.log("inside addTasktoDB Function");

    var addTask = document.getElementById("cardFooter");

    var tempHolder = document.createElement("div");
    var taskInput = document.createElement("input");
    var taskSubmit = document.createElement("button");
    taskSubmit.innerHTML = "Submit";
    taskSubmit.setAttribute("class", "btn btn-primary");
    taskSubmit.setAttribute("type", "button");
    taskInput.setAttribute("type", "text");

    tempHolder.appendChild(taskInput);
    tempHolder.appendChild(taskSubmit);
    addTask.appendChild(tempHolder);

    taskSubmit.addEventListener("click", function() {
        console.log("inside aeventlistener for submitting task");

        var url = "addTask";
        var method = "POST";
        var data = {};
        data.task = taskInput.value;
        console.log(data);
        verbData(method, url, addedTask, data);
        tempHolder.innerHTML = " ";
        getData("todos", displayTodo);

        function addedTask(data) {
            console.log("added task");

        }
    });
}


var deleteTask = document.getElementById("deleteTask");
deleteTask.addEventListener("click", deleteTasktoDB);

function deleteTasktoDB() {
    console.log("inside deleteasktoDB Function");
    var checkers = document.getElementsByName("isChecked");
    var ids = " ";

    for (var i = 0; i < checkers.length; i++) {
        if (checkers[i].checked === true) {
            if (ids === " ") {
                ids += checkers[i].value;

            } else {
                ids += "," + checkers[i].value;
            }
        }
    }

    var data = {};
    data.id = ids;

    console.log(ids);
    var method = "delete";
    var url = "/delete";

    verbData(method, url, deletedTask, data);
    getData("todos", displayTodo);

    function deletedTask() {

        console.log("deleted Task");
    }

}

var logout = document.getElementById("logout");
logout.addEventListener("click", logutFN);

function logutFN() {
    console.log(logout + " in logout function");

    getData("logout", undefined);
    window.location = "http://localhost:3000";



}


function login() {
    console.log("inside login function");

    var username = document.getElementById("username").value;
    var password = document.getElementById("inputPassword").value;
    console.log("Username : " + username);

    var user = {};
    user.username = username;
    user.password = password;

    var url = "login";
    var method = "PUT";


    console.log(user);
    
    
    window.location = "http://localhost:3000/";
	
	verbData(method, url, undefined, user);
	userSession = true;
    userTest = true;
    console.log("userSession state :" + userSession + " and " + userTest);



}


};
