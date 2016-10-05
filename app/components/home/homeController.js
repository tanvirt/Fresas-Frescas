angular.module('main').controller('HomeController', function($scope, $firebaseArray, $state) {
	// $scope.inventory = ['apples', 'oranges', 'bananas'];

	$scope.loginImage = {
		background: 'url(../../assets/img/strawberry.jpg)'
	};

	console.log($scope.loginImage)
	var ref = firebase.database().ref().child("messages");

	// create a synchronized array
	$scope.messages = $firebaseArray(ref);

	// add new items to the array
	// the message is automatically added to our Firebase database!
	$scope.addMessage = function() {

		if($scope.newMessageText === "i like da berry"){
			$scope.loginImage = {
				background: 'url(../../assets/img/strawberry.jpg)'
			};
		}
		else if($scope.newMessageText === "i like da choco"){
			$scope.loginImage = {
				background: 'url(../../assets/img/choco.jpg)'
			};
		}
		else {
			$scope.messages.$add({
				text: $scope.newMessageText
			});			
		}		


	};

});
