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

	//Firebase auth users
	var userRef = firebase.database().ref().child("users");
	var userList = $firebaseArray(userRef);

	userList.$loaded().then(function() {
		angular.forEach(userList, function(aUser) {
			console.log(aUser);
			console.log(aUser.$id);
		})
	});

	$scope.authObj = $firebaseAuth();
	$scope.user = $scope.authObj.$getAuth();

	// Create new project and set defaults
	$scope.project = {};
	$scope.project.title = "Testing Owner";
	$scope.project.summary = "";
	$scope.project.details = "";
	$scope.project.photo = "../../assets/img/modern_workplace.jpg";
	$scope.project.owners = ['SZquHvgX4eUEDaZpcHECJriH0RH3', 'L01h753IV4Q1GY6KXuHbJExEHC32'];
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
			var firebaseUser = $scope.authObj.$getAuth();
			// checkOwners(firebaseUser.uid);

			ref.child("projects").child(uniqueId).set({
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
			for(var i=0; i < $scope.project.owners.length; i++) {
				ref.child("users").child($scope.project.owners[i]).child("ownedProjects").set({
					project: $scope.project.title
				})
			}
			for(var i=0; i < $scope.project.members.length; i++) {
				ref.child("users").child($scope.project.members[i]).child("memberProjects").set({
					project: $scope.project.title
				})
			}
			$state.go("myProjects");
		}
		catch(error) {
			console.log('Error adding project to DB: ', error);
			$scope.cancel();
		}
	};

	//Call this function when an owner is added to check if already
	//an owner of this project.
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

	//Call this function when a member is added to check if already
	//an member of this project.
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

	//Call this function when a tag is added to check if already
	//a tag of this project.
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

	$scope.removeOwner = function(owner) {
		$scope.project.owners.splice($scope.project.owners.indexOf(owner), 1);
	}

	$scope.removeMember = function(member) {
		$scope.project.members.splice($scope.project.members.indexOf(member), 1);
	}

	$scope.validateInput = function() {
		if ($scope.project.title === "") {

		}
	}

	$scope.cancel = function(source) {

	}

});
