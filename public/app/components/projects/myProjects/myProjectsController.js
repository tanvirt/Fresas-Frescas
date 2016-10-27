angular.module('main').controller('MyProjectsController', function($scope) {

	// App header variables
	$scope.heading = "My Projects";
	$scope.subheading = "Work hard, play hard.";
	$scope.headingImage = "../../assets/img/black_coffee.jpg";

	// Main content starts
	$scope.projectsOwning = [];
	$scope.projectsWorking = [];
	$scope.projectsFollowing = [];

});
