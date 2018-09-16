$(document).ready(function(event) {

  	// var app = firebase.app();
  	// Проверяем, работает ли firebase
  	// console.log(app);

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyC9QE6B0zwaVN28YRZBypNrAsJ77M2yY-w",
		authDomain: "kuznetsovandrey76-testproject.firebaseapp.com",
		databaseURL: "https://kuznetsovandrey76-testproject.firebaseio.com",
		projectId: "kuznetsovandrey76-testproject",
		storageBucket: "kuznetsovandrey76-testproject.appspot.com",
		messagingSenderId: "196100242422"
	};
	firebase.initializeApp(config);

	// Создаем БД
	var database = firebase.database();
	// Аналог таблицы в БД
	var ref = database.ref('user');

	// Запрашиваем данные из таблицы на сервере
	ref.on('value', gotData, errData);

	// Если все ок 
	function gotData(data) {
		console.log('ok', data.val());
	}

	function errData(err) {
		console.log('err', err);
	}


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

		  // Подключаемся к GitHub 
		  $.ajax({
			type: "GET",
			url: connect,
			// dataType: "json",
			success: function (data, textStatus, jqXHR) {

				// Берем только часть информации предоставляемой API GitHub
				var toDB = {
					login: data.login,
					email: data.email,
					name: data.name
				}

				// Отправляем данные в таблицу на сервер
				ref.push(toDB); 
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