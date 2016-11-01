angular.module('main').controller('SearchController', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject) {
	
	// App header variables
	$scope.heading = "Looking For Something?";
	$scope.subheading = "We got your back.";
	$scope.headingImage = "../../assets/img/world.jpg";

	// Main content starts
	var searchedString = "Test Project";
	var ref = firebase.database().ref();

	var projectList = $firebaseArray(ref.child("projects"));
	var tagList = $firebaseArray(ref.child("tags"));
	var userList = $firebaseArray(ref.child("users"));


	$scope.displayedList = [];
});
