angular.module('main').controller('MyProjectsController', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject) {

	// App header variables
	$scope.heading = "My Projects";
	$scope.subheading = "Work hard, play hard.";
	$scope.headingImage = "../../assets/img/black_coffee.jpg";

	// Main content starts
	$scope.projectsOwning = [];
	$scope.projectsWorking = [];
	$scope.projectsFollowing = [];

	var ref = firebase.database().ref().child("projects");
	var projectList = $firebaseArray(ref);

	projectList.$loaded().then(function() {
		angular.forEach(projectList, function(project) {
			console.log(project);
			console.log(project.views);
		})
	});

});
