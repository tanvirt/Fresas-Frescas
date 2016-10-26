angular.module('main').controller('CreateProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $state) {

	//create new project and set defaults
	$scope.project = {};
	$scope.project.title = "this is a test title";
	$scope.project.description = "Enter your project description";
	$scope.project.photo = "../../assets/img/modern_workplace.jpg";
	$scope.project.owners = ['Tanvir Talukder', 'Julia Kieserman'];
	$scope.project.members = ['Kyle Wahl', 'Christopher Martin', 'Jason Ngo', 'Samuel Wildman'];
	$scope.project.subscribers = [];
	$scope.project.tags = ['AngularJS', 'Firebase'];
	$scope.project.assets = ['ayo', 'random shit', 'dunno how this works'];
	$scope.project.likes = 0;
	$scope.project.views = 0;
	$scope.project.creationDate = "";

	// App header variables
	$scope.heading = "Create A Project";
	$scope.subheading = "Share your inspiration.";
	$scope.headingImage = "../../assets/img/ideal_workplace.jpg";

	var ref = firebase.database().ref().child("projects");

	$scope.addProjectToDatabase = function() {
		var dateObj = new Date();
		ref.child($scope.project.title).set({
			description: $scope.project.description,
			members: $scope.project.members,
			owners: $scope.project.owners,
			subscribers: $scope.project.subscribers,
			tags: $scope.project.tags,
			assets: $scope.project.assets,
			likes: $scope.project.likes,
			views: $scope.project.views,
			creationDate: dateObj
		});
	};

});