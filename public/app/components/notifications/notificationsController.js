
angular.module('main').controller('NotificationsController', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject) {

	// App header variables
	$scope.heading = "VIEW YOUR NOTIFICATIONS";
	$scope.subheading = "Keep yourself up-to-date.";
	$scope.headingImage = "../../assets/img/binary.jpg";

	// Main content starts
	var ref = firebase.database().ref();
	$scope.authObj = $firebaseAuth();
	$scope.notifications = [];

	$scope.authObj.$onAuthStateChanged(function(user) {
		if (user) {
			$scope.notifications = $firebaseArray(ref.child("users").child(user.uid).child("notifications"));
			$scope.notifications.$loaded().then(function() {
				$scope.myUser = user.uid;
			})
		}
	})
});
