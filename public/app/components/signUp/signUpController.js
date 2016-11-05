angular.module('main').controller('SignUpController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $firebaseObject, $state) {

	$scope.authObj = $firebaseAuth();

	$scope.firstName;
	$scope.lastName;
	$scope.username;
	$scope.password;
	$scope.confirmPassword;
	$scope.position;
	$scope.skills = [];
	$scope.summary = "";
	$scope.experience = "";
	$scope.profilePicture = "";

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
			createUserWithEmailAndPassword();
  		}
  		else {
  			$scope.error = "Please fill out all fields correctly";
  			console.log($scope.error);
  		}
	}

	fieldsAreValid = function() {
		var fields = ["firstName", "lastName", "username", "password", "confirmPassword", "position"];
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


	createUserWithEmailAndPassword = function() {
		$scope.authObj.$createUserWithEmailAndPassword($scope.username, $scope.password)
		.then(function(firebaseUser) {
			console.log("User " + firebaseUser.uid + " created successfully!");
			addUserToDatabase(firebaseUser);
			$scope.login();
		})
		.catch(function(error) {
			$scope.error = error.message;
			console.error("Error: ", error);
		});
	}

	addUserToDatabase = function(user) {
		var ref = firebase.database().ref();
		var userRef = ref.child("users");
		var profileRef = userRef.child(user.uid);

		var profileObject  = $firebaseObject(profileRef);

		profileObject.$bindTo($scope, "data").then(function() {
			$scope.data.firstName = $scope.firstName;
			$scope.data.lastName = $scope.lastName;
			$scope.data.username = $scope.username;
			$scope.data.position = $scope.position;
			$scope.data.skills = $scope.skills;
			$scope.data.experience = $scope.experience;
			$scope.data.summary = $scope.summary;
			$scope.data.profilePicture = $scope.profilePicture
		})
		console.log($scope.skills);
		angular.forEach($scope.skills, function(skill) {
			console.log(skill);
			ref.child("tags").child(skill).child("users").child(user.uid).set({
				firstName: $scope.firstName,
				lastName: $scope.lastName
			})
		})
	}

	
	$('.chips').material_chip();

  	$('.chips-placeholder').material_chip({
    	placeholder: 'Enter a skill',
    	secondaryPlaceholder: '+Skill',
  	});
        
	$('.chips').on('chip.add', function(e, chip){
    	$scope.skills.push(chip.tag);
  	});

});
