angular.module('main').controller('CreateProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $state) {
//TODO:
//1. form/field validation, required fields
//2. how to insert tag data into database
//3. upload link for assets

		var ref = firebase.database().ref();

		//load all users
		$scope.allUsers = $firebaseArray(ref.child("users"));
		$scope.allTags = $firebaseArray(ref.child("tags"));
		//WE SHOULD HAVE A FACTORY FOR TAGS!!
		console.log("ova here");
		console.log($scope.allTags);

		//wait for data to load
		$scope.allUsers.$loaded()
			.then(function() {
				//PROBLEM::::::how does a user switch someone from member to owner or vice versa?
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

	// Create new project
	$scope.project = {};
	$scope.project.title = "";
	$scope.project.summary = "";
	$scope.project.details = "";
	$scope.project.photo = "";
	$scope.project.owners = [];
	$scope.project.members = [];
	$scope.project.subscribers = [];
	$scope.project.tags = [];
	$scope.project.assets = [];
	$scope.project.likes = 0;
	$scope.project.views = 0;
	$scope.project.creationDate = "";
	var uniqueId = $scope.project.title + ';' + $scope.project.owners[0];

	$scope.addProjectToDatabase = function() {
		try {
			//var firebaseUser = $scope.authObj.$getAuth();
			//checkOwners(firebaseUser.uid);

			ref.child("projects").child(uniqueId).set({
				summary: $scope.project.summary,
				details: $scope.project.details,
				members: objectsToIds($scope.project.members),
				owners: objectsToIds($scope.project.owners),
				subscribers: $scope.project.subscribers,
				assets: $scope.project.assets,
				likes: $scope.project.likes,
				views: $scope.project.views,
				creationDate: new Date()
			});

			for(var i=0; i < $scope.project.tags.length; i++) {
				ref.child("tags").child($scope.project.tags[i]).add({
					uniqueId: $scope.project.title
				});
			}
			$state.go("myProjects");
		}
		catch(error) {
			console.log('Error adding project to DB: ', error);
			$scope.cancel();
		}
	};

	objectsToIds = function(objArray) {
		var idArray = [];
		for (var i=0; i < objArray.length; i++) {
			idArray.push(objArray[i].$id);
		}
		return idArray;
	}
	/*checkOwners = function(user) {
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
	}*/

	$scope.removeOwner = function(owner) {
		//remove from project owners array
		$scope.project.owners.splice($scope.project.owners.indexOf(owner), 1);
		//add to list of available owners
		$scope.allUsers.push(owner);
	}

	$scope.removeMember = function(member) {
		$scope.project.members.splice($scope.project.members.indexOf(member), 1);
		$scope.allUsers.push(member);
	}

	$scope.addOwner = function() {
		//add owner ID to the database
		$scope.project.owners.push($scope.selectedOwner);
		//remove from available owners for project
		$scope.allUsers.splice($scope.allUsers.indexOf($scope.selectedOwner), 1);
		$scope.selectedOwner = "";
	}

	$scope.addMember = function() {
		$scope.project.members.push($scope.selectedMember);
		$scope.allUsers.splice($scope.allUsers.indexOf($scope.selectedMember));
		$scope.selectedMember = "";
	}

	$scope.addTag = function() {
		$scope.project.tags.push($scope.selectedTag);
	}

	$scope.uploadAsset = function() {
		var f = document.getElementById('file').files[0],
      r = new FileReader();
  		r.onloadend = function(e){
    var data = e.target.result;
    //send your binary data via $http or $resource or do anything else with it
  }
  r.readAsBinaryString(f);
	}

	$scope.cancel = function(source) {
		$state.go("myProjects");
	}

});
