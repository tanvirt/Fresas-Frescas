angular.module('main').controller('CreateProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $state) {

	// App header variables
	$scope.heading = "Create A Project";
	$scope.subheading = "Share your inspiration.";
	$scope.headingImage = "../../assets/img/ideal_workplace.jpg";

	$scope.authObj = $firebaseAuth();
	$scope.user = $scope.authObj.$getAuth();

	// Create new project and set defaults
	$scope.project = {};
	$scope.project.title = "Testing Owner";
	$scope.project.summary = "";
	$scope.project.details = "";
	$scope.project.photo = "../../assets/img/modern_workplace.jpg";
	$scope.project.owners = [];
	$scope.project.members = [];
	$scope.project.subscribers = [];
	$scope.project.tags = ['AngularJS', 'Firebase'];
	$scope.project.assets = ['ayo', 'random shit', 'dunno how this works'];
	$scope.project.likes = 0;
	$scope.project.views = 0;
	$scope.project.creationDate = "";

	//Firebase auth users
	var userRef = firebase.database().ref().child("users");
	var userList = $firebaseArray(userRef);

	userList.$loaded().then(function() {
		angular.forEach(userList, function(aUser) {
			console.log(aUser);
			console.log(aUser.$id);
		})
	});

	var ref = firebase.database().ref().child("projects");

	$scope.addProjectToDatabase = function() {
		try {
			var firebaseUser = $scope.authObj.$getAuth();
			checkOwners(firebaseUser.uid);
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

	checkOwners = function(user) {
		var added = false;
		angular.forEach($scope.project.owners, function(owner) {
			if (user == owner) {
				added = true;
			}
		})
		if (!added) {
			$scope.project.owners.push(user);
		}
	}

	checkMembers = function(user) {
		var added = false;
		angular.forEach($scope.project.members, function(member) {
			if (user == member) {
				added = true;
			}
		})
		if (!added) {
			$scope.project.members.push(user);
		}
	}

	checkTags = function(newTag) {
		var added = false;
		angular.forEach($scope.project.tags, function(tag) {
			if (newTag == tag) {
				added = true;
			}
		})
		if (!added) {
			$scope.project.tags.push(newTag);
		}
	}

});
