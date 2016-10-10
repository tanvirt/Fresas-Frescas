angular.module('main').controller('HomeController', function($scope, $firebaseArray, $state) {
	// App header variables
	$scope.heading = "Fresas Frescas";
	$scope.subheading = "We have the freshest berries.";
	$scope.headingImage = "../../assets/img/tinted_strawberry.jpg";

	var ref = firebase.database().ref().child("messages");

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

});
