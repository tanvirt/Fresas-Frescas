angular.module('main').controller('SignUpController', function($rootScope, $scope, $firebaseAuth, $state) {

	$scope.authObj = $firebaseAuth();

	$scope.firstName;
	$scope.lastName;
	$scope.username;
	$scope.password;
	$scope.confirmPassword;

	$scope.isValid = true;

	$scope.areFieldsValid = function(){
		return(inputBoxes.firstName.$valid && inputBoxes.lastName.$valid && inputBoxes.username.$valid && inputBoxes.password.$valid);
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
		if($scope.password === $scope.confirmPassword && $scope.areFieldsValid()){

			console.log('good');

		$scope.authObj.$createUserWithEmailAndPassword($scope.username, $scope.password) 
  			.then(function(firebaseUser) { 
    				console.log("User " + firebaseUser.uid + " created successfully!"); 
  				}).catch(function(error) { 
   					 console.error("Error: ", error); 
 					});
  		}
  		else{
  			$scope.isValid = false;
  		}
	}
});
