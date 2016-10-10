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
	$scope.password
	var email = "bob@bob.com"
	var password = "bob"
	$scope.login = function() {
		firebase.auth().signInWithEmailAndPassword($scope.username, $scope.password).catch(function(error) {


		var errorCode = error.code;
		var errorMessage = error.message;

		});
		console.log($scope.username)
		console.log($scope.password)
		var user = firebase.auth().currentUser
		console.log(user)

		$state.go('home');
	};

});