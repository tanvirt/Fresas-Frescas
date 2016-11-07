angular.module('main').controller('CreateProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $state) {
//TODO:
//1. form/field validation, required fields
//2. upload photo stuff

	var ref = firebase.database().ref();
	$scope.invalidTitle = false;
	$scope.invalidTags = false;

	//load all users
	$scope.allUsers = $firebaseArray(ref.child("users"));
	$scope.allTags = $firebaseArray(ref.child("tags"));
	$scope.authObj = $firebaseAuth();

	$scope.uploader = {};

	//wait for data to load
	$scope.allUsers.$loaded()
		.then(function() {
			//all users is loaded
		})
		.catch(function(err) {
			console.error(err);
		});

	// App header variables
	$scope.heading = "CREATE A PROJECT";
	$scope.subheading = "Share your inspiration.";
	$scope.headingImage = "../../assets/img/ideal_workplace.jpg";

	//Firebase auth users
	var userRef = firebase.database().ref().child("users");
	var userList = $firebaseArray(userRef);

	userList.$loaded().then(function() {
		angular.forEach(userList, function(aUser) {
		})
	});

	$scope.authObj = $firebaseAuth();
	$scope.user = $scope.authObj.$getAuth();

	// Create new project
	$scope.project = {};
	$scope.project.title = "";
	$scope.project.summary = "";
	$scope.project.details = "";
	$scope.project.photo = "https://community.dynamics.com/cfs-filesystemfile/__key/msdenhancedbloggingcfs/FeaturedImages/227825_5F00_Modern-Workplace.jpg"; //default img
	$scope.project.owners = [];
	$scope.project.members = [];
	$scope.project.subscribers = [];
	$scope.project.tags = [];
	$scope.project.assets = [];
	$scope.project.likes = 0;
	$scope.project.views = 0;

	$scope.addProjectToDatabase = function() {
		console.log($scope.uploader.flow);
		if (validateData() === false) {
			return;
		}

		var firebaseUser = $scope.authObj.$getAuth();

		var ownersList = objectsToIds($scope.project.owners);
		ownersList.push("sOfCOLh80tMCNgAhziKrsXqeSBv2");
		var membersList = objectsToIds($scope.project.members);
		membersList.push("sOfCOLh80tMCNgAhziKrsXqeSBv2");
		$scope.project.subscribers.push("sOfCOLh80tMCNgAhziKrsXqeSBv2");

		try {
			var projectAddRef = ref.child("projects").push({
				creationDate: new Date().toString(),
				title: $scope.project.title,
				creator: firebaseUser.uid,
				summary: $scope.project.summary,
				details: $scope.project.details,
				members: membersList,
				owners: ownersList,
				subscribers: $scope.project.subscribers,
				assets: $scope.project.assets,
				likes: $scope.project.likes,
				views: $scope.project.views,
				tags: $scope.project.tags,
				photo: $scope.project.photo
			});
			var projectAddObj = $firebaseObject(projectAddRef);
			var addedID = projectAddObj.$id;

			ref.child("users").child(firebaseUser.uid).child("createdProjects").child(addedID).set({
				project: $scope.project.title
			});

			ref.child("users").child("sOfCOLh80tMCNgAhziKrsXqeSBv2").child("subscribedProjects").child(addedID).set({
				project: $scope.project.title
			});

			for (var i=0; i < $scope.project.tags.length; i++) {
				ref.child("tags").child($scope.project.tags[i]).child("projects").child(addedID).set({
					project: $scope.project.title
				});
			}

			for(var i=0; i < ownersList.length; i++) {
				ref.child("users").child(ownersList[i]).child("ownedProjects").child(addedID).set({
					project: $scope.project.title
				});
			}

			for(var i=0; i < $scope.project.members.length; i++) {
				ref.child("users").child($scope.project.members[i]).child("memberProjects").child(addedID).set({
					project: $scope.project.title
				});
			}
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

	validateData = function() {
		console.log("here x1");
		if($scope.project.photo == ""){
			$scope.project.photo = "https://community.dynamics.com/cfs-filesystemfile/__key/msdenhancedbloggingcfs/FeaturedImages/227825_5F00_Modern-Workplace.jpg";
		}
		if ($scope.project.title === "") {
			$scope.invalidTitle = true;
			$scope.invalidTags = false;
			return false;
		}
		else if ($scope.project.tags.length === 0) {
			console.log("here x2");
			$scope.invalidTags = true;
			$scope.invalidTitle = false;
			return false;
		}
		else {
			return true;
		}
	}

	$scope.uploadPhoto = function() {
		var f = document.getElementById('file').files[0],
      	r = new FileReader();
  		r.onloadend = function(e){
    		var data = e.target.result;
  		}
  		r.readAsBinaryString(f);

	}

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

	$scope.removeSubscriber = function(subscriber) {
		$scope.project.subscribers.splice($scope.project.subscribers.indexOf(subscriber), 1);
		$scope.allUsers.push(subscriber);
	}

	$scope.addOwner = function() {
		//check that owner is valid
		if($scope.allUsers.indexOf($scope.selectedOwner) >= 0) {
			//add owner ID to the database
			$scope.project.owners.push($scope.selectedOwner);
			//remove from available owners for project
			$scope.allUsers.splice($scope.allUsers.indexOf($scope.selectedOwner), 1);
			$scope.selectedOwner = "";
		} else {
			console.log("error, not a real user");
		}

	}

	$scope.addMember = function() {
		if ($scope.allUsers.indexOf($scope.selectedMember) >= 0) {
			$scope.project.members.push($scope.selectedMember);
			$scope.allUsers.splice($scope.allUsers.indexOf($scope.selectedMember), 1);
			$scope.selectedMember = "";
		} else {
			console.log("error, not a real user");
		}

	}

	$scope.addSubscriber = function() {
		if ($scope.allUsers.indexOf($scope.selectedSubscriber) >= 0) {
			$scope.project.subscribers.push($scope.selectedSubscriber);
			$scope.allUsers.splice($scope.allUsers.indexOf($scope.selectedSubscriber), 1);
			$scope.selectedSubscriber = "";
		} else {
			console.log("error, not a real user");
		}
	}

	$scope.addTag = function() {
		$scope.project.tags.push($scope.selectedTag);
	}

	$scope.uploadAsset = function() {
		var f = document.getElementById('file').files[0],
      	r = new FileReader();
  		r.onloadend = function(e){
    		var data = e.target.result;
  		}
  		r.readAsBinaryString(f);
	}

	$scope.callMe = function() {
		console.log("i have no idea what i'm doing here");
		console.log($flow.files[0]);
	}

	$scope.cancel = function() {
		$state.go("myProjects");
	}

});
