console.log("loaded app.js")

window.onload = function() {


	init();

};



var init = function() {

	function getData(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);

		xhr.onreadystatechange = function() {
			if (xhr.status < 400 && xhr.readyState == 4) {

				console.log("type of object recieved before pasrsing " + typeof(xhr.responseText));
				console.log("inside getData function ln 22" + xhr.responseText);
				var tasks = (JSON.parse(xhr.responseText));
				console.log("type of object recieved after parsing " + typeof(tasks));
				// console.log(tasks);
				callback(tasks);
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
					callback(JSON.parse(xhr.responseText));
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


	getData("todos", displayTodo);

	function displayTodo(data) {
		console.log("inside displayTodo function");
		console.log(" in callback function getting data" + data);

		var todoDiv = document.getElementById("todo");
		todoDiv.innerHTML = " ";

		console.log(todoDiv);
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

			function addedTask() {
				console.log("added task");

			}
		});
	}



};