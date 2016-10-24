angular.module('main').controller('LoginController', function($rootScope, $scope, $firebaseAuth, $state) {

	$scope.authObj = $firebaseAuth();

	$scope.error = "";

	$scope.login = function() {
		try {
			$scope.authObj.$signInWithEmailAndPassword($scope.username, $scope.password)
			.then(function(firebaseUser) {
				console.log("Signed in as:", firebaseUser.uid);
				$rootScope.user = firebaseUser;
				console.log($rootScope.user)
				$scope.loginError = false;
				$state.go('home');
			})
			.catch(function(error) {
		  		$scope.error = "Authentication failed: " + error;
			});
		}
		catch(error) {
			$scope.error = "Authentication failed: " + error;
		}
	}

	$scope.signUp = function() {
		$state.go('signUp');
	}

	document.getElementById("username")
    .addEventListener("keyup", function(event) {
    	event.preventDefault();
    	if(event.keyCode == 13) {
        	document.getElementById("loginButton").click();
   		}
	});

	document.getElementById("password")
    .addEventListener("keyup", function(event) {
    	event.preventDefault();
    	if(event.keyCode == 13) {
        	document.getElementById("loginButton").click();
   		}
	});
	
});
