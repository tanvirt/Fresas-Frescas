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
		document.getElementById("message-text").value = "";

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

	var ref2 = firebase.database().ref().child("chats");
	$scope.chats = $firebaseArray(ref2);
	$scope.addChatMessage = function(chatName, message){
		$scope.chats.$add({
			name: chatName,
			text: [message]
		});
	}
	$scope.addChatMessage("chat1", "bark");
});
