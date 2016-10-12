angular.module('main').controller('LoginController', function($rootScope, $scope, $firebaseAuth, $state) {

	$scope.authObj = $firebaseAuth();

	$scope.loginError = false;

	$scope.login = function() {
		try{
			$scope.authObj.$signInWithEmailAndPassword($scope.username, $scope.password)
				.then(function(firebaseUser){
					console.log("Signed in as:", firebaseUser.uid);
					$rootScope.user = firebaseUser;
					console.log($rootScope.user)
					$scope.loginError = false;
					$state.go('home');
				}).catch(function(error) {
			  		$scope.loginError = true;
			 		console.log("hey");
			  		console.error("Authentication failed:", error);
				});
		}catch(error){
			$scope.loginError = true;
			 console.log("hi");
			  console.error("Authentication failed:", error);
		}
	}


	loginFailure = function(){
		$scope.loginError = true;
		console.log("hey");
	}

	$scope.getError = function(){
		return $scope.loginError;
	}

	document.getElementById("username")
    .addEventListener("keyup", function(event) {
    	event.preventDefault();
    	if (event.keyCode == 13) {
        	document.getElementById("loginButton").click();
   		}
	});

	document.getElementById("password")
    .addEventListener("keyup", function(event) {
    	event.preventDefault();
    	if (event.keyCode == 13) {
        	document.getElementById("loginButton").click();
   		}
	});
});
