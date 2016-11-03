angular.module('main').controller('NotificationsController', function($scope) {
	// App header variables
	$scope.heading = "View My Notifications";
	$scope.subheading = "Keep yourself up-to-date.";
	$scope.headingImage = "../../assets/img/binary.jpg";

	// Main content starts
	var ref = firebase.database().ref().child("users");

	$scope.authObj.$onAuthStateChanged(function(user) {
		if(user) {
			var userId = user.uid;
			$scope.user = $firebaseObject(ref.child(userId));
			console.log($scope.user);
			console.log($scope.user.notifications);
			//$scope.notifications = user.notifications;
			console.log($scope.notifications);
		} else {
			console.log("error, who are you?");
		}
	});


	//source, destination, type/reason, approved/disapproved 
});
