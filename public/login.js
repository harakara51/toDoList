



var createAccountButton = document.getElementById("createAccount");

createAccountButton.addEventListener("click", createAccounttoDB);

function  createAccounttoDB () {
	console.log("inside createAccounttpDB function");

	var username = document.getElementById("username").value;
	var password = document.getElementById("inputPassword").value;
	var email = document.getElementById("inputEmail").value;

	var user ={};
	user.username = username;
	user.password = password;
	user.email = email;

	// console.log("Username : " + username +  " password : " +password +  " email : "+ email)


			var url = "createAccount";
			var method = "POST";
		
			
			console.log(user);
			verbData(method, url, postAccount, user);

			function postAccount() {

				console.log("Account created successfull");
			}


}


