$(document).ready(function(event) {

  	var app = firebase.app();
  	// Проверяем, работает ли firebase
  	// console.log(app);


  	$("#login").click(function() {

  		// Authenticate Using GitHub with JavaScript
  		// https://firebase.google.com/docs/auth/web/github-auth?authuser=0
	  	var provider = new firebase.auth.GithubAuthProvider();

	  	firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
		  var token = result.credential.accessToken;

		  // Use the access token to access the API
		  // The access token allows you to make requests to the API on a behalf of a user.
		  var connect = "https://api.github.com/user?access_token=" + token;

		  $.ajax({
			type: "GET",
			url: connect,
			// dataType: "json",
			success: function (data, textStatus, jqXHR) {

				// Ник 
				var login = data.login;
				var email = data.email;
				var name = data.name;
			}
		});

		// The signed-in user info.
		var user = result.user;


		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;

		  console.log(errorMessage);
		});
  	});


  	$("#sign-out").click(function() {

		firebase.auth().signOut().then(function() {
		  // Sign-out successful.

		}).catch(function(error) {
		  // An error happened.
		});

	});

});