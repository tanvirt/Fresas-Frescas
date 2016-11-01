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

	var tempProject = {
		title: "Welcome Buddy Application",
		photo: "../../assets/img/splash.jpg",
		summary: "Connect new hires with experienced employees.",
		details: "Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase. Integrates AngularJS and Firebase.",
		likes: "123",
		views: "456",
		comments: "7"
	};

	$scope.projectsOwning.push(tempProject);
	$scope.projectsWorking.push(tempProject);
	$scope.projectsFollowing.push(tempProject);

});
