angular.module('main').controller('LoginController', function($scope, $firebaseAuth, $state) {
	var auth = $firebaseAuth();

	// login with Facebook
	// auth.$signInWithPopup("google").then(function(firebaseUser) {
	// 	console.log("Signed in as:", firebaseUser.uid);
	// 	$state.go('home');
	// }).catch(function(error) {
	// 	console.log("Authentication failed:", error);
	// });

	$scope.username
	var email = "bobtony@firebase.com"
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {


		var errorCode = error.code;
		var errorMessage = error.message;

	});
	console.log("LOGGGED IN BIIIITCH")
});
