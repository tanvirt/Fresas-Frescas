angular.module('main').controller('LoginController', function($scope, $firebaseAuth, $state, $rootScope) {
	var auth = $firebaseAuth();

	// login with Facebook
	auth.$signInWithPopup("google").then(function(firebaseUser) {
		console.log("Signed in as:", firebaseUser.uid);
		$rootScope.loggedIn = true;
		$state.go('home');
	}).catch(function(error) {
		console.log("Authentication failed:", error);
		$rootScope.loggedIn = false;
	});
});
