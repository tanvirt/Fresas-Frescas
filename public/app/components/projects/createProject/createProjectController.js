angular.module('main').controller('CreateProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $state) {

	// App header variables
	$scope.heading = "Create A Project";
	$scope.subheading = "Share your inspiration.";
	$scope.headingImage = "../../assets/img/ideal_workplace.jpg";

	// Create new project and set defaults
	$scope.project = {};
	$scope.project.title = "";
	$scope.project.summary = "";
	$scope.project.details = "";
	$scope.project.photo = "../../assets/img/modern_workplace.jpg";
	$scope.project.owners = ['Tanvir Talukder', 'Julia Kieserman'];
	$scope.project.members = ['Kyle Wahl', 'Christopher Martin', 'Jason Ngo', 'Samuel Wildman'];
	$scope.project.subscribers = [];
	$scope.project.tags = ['AngularJS', 'Firebase'];
	$scope.project.assets = ['ayo', 'random shit', 'dunno how this works'];
	$scope.project.likes = 0;
	$scope.project.views = 0;
	$scope.project.creationDate = "";

	var ref = firebase.database().ref().child("projects");

	$scope.addProjectToDatabase = function() {
		try {
			ref.child($scope.project.title).set({
				summary: $scope.project.summary,
				details: $scope.project.details,
				members: $scope.project.members,
				owners: $scope.project.owners,
				subscribers: $scope.project.subscribers,
				tags: $scope.project.tags,
				assets: $scope.project.assets,
				likes: $scope.project.likes,
				views: $scope.project.views,
				creationDate: new Date()
			});
		}
		catch(error) {
			console.log('Error adding project to DB: ', error);
		}
	};

});
