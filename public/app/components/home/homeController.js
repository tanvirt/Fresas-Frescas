angular.module('main').controller('HomeController', function($rootScope, $scope, $firebaseArray, $firebaseAuth, $state) {


	$scope.heading = "Fresas Frescas";
	$scope.subheading = "We have the freshest berries.";

	var ref = firebase.database().ref().child("messages");

	$scope.homeImage = "../../assets/img/tinted_strawberry.jpg";

	// create a synchronized array
	$scope.messages = $firebaseArray(ref);

	// add new items to the array
	// the message is automatically added to our Firebase database!
	$scope.addMessage = function() {

		if($scope.newMessageText === "i like da berry"){
			$scope.homeImage = "../../assets/img/tinted_strawberry.jpg";
		}
		else if($scope.newMessageText === "i like da choco"){
			$scope.homeImage = "../../assets/img/tinted_choco.jpg";
		}
		else {
			$scope.messages.$add({
				text: $scope.newMessageText
			});			
		}		


	};

	$scope.signOut = function() {
		$scope.authObj.$signOut();
		$state.go('login');
	}

});
