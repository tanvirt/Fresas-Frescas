angular.module('main').controller('CreateProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $state) {
//TODO:
//1. form/field validation, required fields
//2. upload photo stuff
//3. change to use auto-generated firebase

	var ref = firebase.database().ref();

	//load all users
	$scope.allUsers = $firebaseArray(ref.child("users"));
	$scope.allTags = $firebaseArray(ref.child("tags"));
	$scope.authObj = $firebaseAuth();
	//WE SHOULD HAVE A FACTORY FOR TAGS!!

	//wait for data to load
	$scope.allUsers.$loaded()
		.then(function() {
			//all users is loaded
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
		})
	});

	$scope.authObj = $firebaseAuth();
	$scope.user = $scope.authObj.$getAuth();

	// Create new project
	$scope.project = {};
	$scope.project.title = "Test for Chris";
	$scope.project.summary = "";
	$scope.project.details = "";
	$scope.project.photo = "../../assets/img/modern_workplace.jpg";
	$scope.project.owners = [];
	$scope.project.members = [];
	$scope.project.subscribers = [];
	$scope.project.tags = [];
	$scope.project.assets = [];
	$scope.project.likes = 0;
	$scope.project.views = 0;

	$scope.addProjectToDatabase = function() {
		var creationDate = new Date();
		var firebaseUser = $scope.authObj.$getAuth();
		var uniqueId = firebaseUser.uid + ';' + creationDate;

		var ownersList = objectsToIds($scope.project.owners);
		ownersList.push(firebaseUser.uid);

		try {
			ref.child("projects").child(uniqueId).set({
				title: $scope.project.title,
				summary: $scope.project.summary,
				details: $scope.project.details,
				members: objectsToIds($scope.project.members),
				owners: ownersList,
				subscribers: $scope.project.subscribers,
				assets: $scope.project.assets,
				likes: $scope.project.likes,
				views: $scope.project.views,
				tags: $scope.project.tags,
				creationDate: creationDate
			});

			for (var i=0; i < $scope.project.tags.length; i++) {
				var tagsRef = ref.child("tags").child($scope.project.tags[i]).child(uniqueId);
				tagsRef.set({title: $scope.project.title});
			}

			for(var i=0; i < $scope.project.owners.length; i++) {
				var projectOwnersRef = ref.child("users").child($scope.project.owners[i].$id).child("ownedProjects");
				projectOwnersRef.$add({project: $scope.project.title});
			}
		
			for(var i=0; i < $scope.project.members.length; i++) {
				var projectMembersRef = ref.child("users").child($scope.project.members[i].$id).child("memberProjects");
				projectMembersRef.$add({project: $scope.project.title});
			}

			for(var i=0; i < $scope.project.subscribers.length; i++) {
				var projectSubscribersRef = ref.child("users").child($scope.project.members[i].$id).child("subscriberProjects");
				projectSubscribersRef.child(uniqueId).set({project: $scope.project.title});
			}

			//this will go to the view for that project once it exists
			//$state.go("myProjects");
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
		if ($scope.allTags.indexOf($scope.selectedTag) < 0) {
			console.log($scope.selectedTag);
			console.log($scope.allTags);
			console.log("TROUBLEEEEEE");
			try {
				var tagsRef = ref.child("tags");
				tagsRef.child($scope.selectedTag).set({});
			} catch(error) {
				console.log("Error adding to db", error);
			}
		}

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

	$scope.cancel = function() {
		$state.go("myProjects");
	}

});
