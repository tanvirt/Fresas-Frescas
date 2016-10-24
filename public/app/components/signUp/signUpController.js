angular.module('main').controller('SignUpController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $state) {

	$scope.authObj = $firebaseAuth();

	$scope.firstName;
	$scope.lastName;
	$scope.username;
	$scope.password;
	$scope.confirmPassword;

	$scope.error = "";

	$scope.back = function() {
		$state.go('login');
	}

	$scope.login = function() {
		$scope.authObj.$signInWithEmailAndPassword($scope.username, $scope.password)
		.then(function(firebaseUser) {
			console.log("Signed in as:", firebaseUser.uid);
			$rootScope.user = firebaseUser;
			console.log($rootScope.user)
			$state.go('home');
		})
		.catch(function(error) {
			console.error("Authentication failed:", error);
		});
	}

	$scope.signUp = function(){
		if(fieldsAreValid()) {
			console.log('sign up fields are valid');
			addUserToDatabase();
			createUserWithEmailAndPassword();
  		}
  		else {
  			$scope.error = "You're an idiot!! Fill out the form correctly";
  			console.log($scope.error);
  		}
	}

	fieldsAreValid = function() {
		var fields = ["firstName", "lastName", "username", "password", "confirmPassword"];
		fields.forEach(function(name) {
			if(!$scope.inputBoxes[name].$valid) {
				console.log("invalid: " + name);
				return false;
			}
		});
		if($scope.password != $scope.confirmPassword) {
			console.log("password mismatch");
			return false;
		}
		return true;
	}

	addUserToDatabase = function() {
		var ref = firebase.database().ref().child("users");
		$scope.users = $firebaseArray(ref);
		$scope.users.$add({
			firstName: $scope.firstName,
			lastName: $scope.lastName,
			username: $scope.username
		});
	}

	createUserWithEmailAndPassword = function() {
		$scope.authObj.$createUserWithEmailAndPassword($scope.username, $scope.password)
		.then(function(firebaseUser) {
			console.log("User " + firebaseUser.uid + " created successfully!");
			$scope.login();
		})
		.catch(function(error) {
			$scope.error = error.message;
			console.error("Error: ", error);
		});
	}

});
