angular.module('main').controller('CreateProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $state) {
	var ref = firebase.database().ref();

		$scope.editingOwners = false;
		$scope.editingMembers = false;
		$scope.editingTags = false;
		//load all users
		$scope.allMembers = $firebaseArray(ref.child("users"));

		//wait for data to load
		$scope.allMembers.$loaded()
			.then(function() {
				console.log($scope.allMembers);
			})
			.catch(function(err) {
				console.error(err);
			});

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

	$scope.project.owner = {};
	var uniqueId = $scope.project.title + ';' + $scope.project.owners[0];

	$scope.addProjectToDatabase = function() {
		$scope.validateInput();
		try {
			ref.child("projects").child(uniqueId).set({
				title: $scope.project.title,
				summary: $scope.project.summary,
				details: $scope.project.details,
				members: $scope.project.members,
				owners: $scope.project.owners,
				subscribers: $scope.project.subscribers,
				assets: $scope.project.assets,
				likes: $scope.project.likes,
				views: $scope.project.views,
				creationDate: new Date()
			});

			for(var i=0; i < $scope.project.tags.length; i++) {
				ref.child("tags").child($scope.project.tags[i]).set({
					project: $scope.project.title
				});
			}
			$state.go("myProjects");
		}
		catch(error) {
			console.log('Error adding project to DB: ', error);
			$scope.cancel();
		}
	};

	$scope.removeOwner = function(owner) {
		$scope.project.owners.splice($scope.project.owners.indexOf(owner), 1);
	}

	$scope.removeMember = function(member) {
		$scope.project.members.splice($scope.project.members.indexOf(member), 1);			$scope.allMembers.push(owner);
	}

	$scope.validateInput = function() {
		if ($scope.project.title === "") {

		}
	}

	$scope.cancel = function(source) {

	}

});
