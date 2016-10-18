angular.module('main').controller('SignUpController', function($rootScope, $scope, $firebaseAuth, $state) {

	$scope.authObj = $firebaseAuth();

	$scope.firstName;
	$scope.lastName;
	$scope.username;
	$scope.password;
	$scope.confirmPassword;

	$scope.error = "";

	fieldsAreValid = function() {
		var valid = true;
		var fields = ["firstName", "lastName", "username", "password", "confirmPassword"];
		if($scope.password != $scope.confirmPassword){
			console.log("bad pass");
			return false;
		}
		fields.forEach(function(name) {
			if(!$scope.inputBoxes[name].$valid) {
				console.log(name);
				valid = false;
			}
		});
		return valid;
	}

	$scope.login = function() {
		$scope.authObj.$signInWithEmailAndPassword($scope.username, $scope.password).then(function(firebaseUser) {
			console.log("Signed in as:", firebaseUser.uid);
			$rootScope.user = firebaseUser;
			console.log($rootScope.user)
			$state.go('home');
		}).catch(function(error) {
			console.error("Authentication failed:", error);
		});
	}

	$scope.signUp = function(){
		if(fieldsAreValid()) {
			console.log('good');

			$scope.authObj.$createUserWithEmailAndPassword($scope.username, $scope.password) 
			.then(function(firebaseUser) { 
				console.log("User " + firebaseUser.uid + " created successfully!"); 
				$scope.login();
			}).catch(function(error) { 
				$scope.error = error.message;
				console.error("Error: ", error); 
			});
  		}
  		else {
  			$scope.error = "You're an idiot!! Fill out the form correctly";
  			console.log("bad");
  		}
	}
});