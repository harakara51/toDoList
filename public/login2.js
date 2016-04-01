	verbData = function(method, url, callback, obj) {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);

		if (obj) {
			xhr.setRequestHeader('Content-Type', 'application/json');
		}

		xhr.onreadystatechange = function() {
			if (xhr.status < 400 && xhr.readyState == 4) {
				//console.log(xhr.responseText);
				if (callback) {
					//callback(JSON.parse(xhr.responseText));
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



	var loginButton = document.getElementById("test");

loginButton.addEventListener("click", login);

function login () {
	console.log("inside login function");

var userSession = true;
console.log("userSession state :" + userSession)

	var username = document.getElementById("username").value;
	var password = document.getElementById("inputPassword").value;
	console.log("Username : " + username);

	var user ={};
	user.username = username;
	user.password = password;
	

	


			var url = "login";
			var method = "PUT";
		
			
			console.log(user);
			verbData(method, url, postAccount, user);
			 window.location="http://localhost:3000/index.html";

			function postAccount() {

				console.log("Account created successfull");
			}


}