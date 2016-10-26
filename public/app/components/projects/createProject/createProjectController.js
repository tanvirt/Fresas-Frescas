angular.module('main').controller('CreateProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $state) {

	// App header variables
	$scope.heading = "Create A Project";
	$scope.subheading = "Share your inspiration.";
	$scope.headingImage = "../../assets/img/ideal_workplace.jpg";

	// Main content starts
	$scope.owners = [
		"Tanvir Talukder",
		"Julia Kieserman"
	];

	$scope.members = [
		"Kyle Wahl",
		"Christopher Martin",
		"Jason Ngo",
		"Samuel Wildman"
	];

	$scope.tags = [
		"AngularJS",
		"Firebase"
	];



	$scope.addProjectToDatabase = function() {
		var ref = firebase.database().ref().child("projects");
		$scope.projects = $firebaseArray(ref);
		$scope.projects.$add({
			description: "blahblah",
			owners: 'whoopa'
		});
	};

});
