angular.module('main').controller('EditProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $state, $stateParams) {

	$scope.myProjectId = $stateParams.editProjectId;
	console.log($scope.myProjectId);

	//get the project
	var ref = firebase.database().ref();
	var currProjectRef = ref.child("projects").child($scope.myProjectId);
	var currentProject = {};
	var projectData = $firebaseObject(ref.child("projects").child($scope.myProjectId));
//	var projectData = $firebaseObject(ref.child("projects").child($scope.myProjectId));
	projectData.$loaded().then(function() {
		var numComments = 0;
		if(projectData.comments){
			numComments = Object.keys(projectData.comments).length;
		}

		$scope.currentProject = {
			$id: projectData.$id,
			title: projectData.title,
			details: projectData.details,
			summary: projectData.summary,
			photo: projectData.photo,
			likes: projectData.likes,
			views: projectData.views,
			tags: projectData.tags,
			commentsNum: numComments
		};

		if(projectData.owners){
			$scope.currentProject.owners = projectData.owners;
		}
		//projectData.$bindTo($scope, "currentProject");

		//get owner and member objects
		for(var i=0; i < projectData.owners.length; i++) {
			convertIdToObj(projectData.owners[i], "owner");
		}
		for(var i=0; i < projectData.members.length; i++) {
			convertIdToObj(projectData.members[i], "member");
		}
	});

	convertIdToObj = function(id, type) {
		var personObj = $firebaseObject(ref.child("users").child(id));

		if (type === "owner") {
			$scope.ownerObjs.push(personObj);
		} else if (type === "member") {
			$scope.memberObjs.push(personObj);
		}
	}

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
	$scope.heading = "EDIT MY PROJECT";
	$scope.subheading = "Redefine possible.";
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

		var firebaseUser = $scope.authObj.$getAuth();

		try {
			var projectAddRef = ref.child("projects").child($scope.myProjectId).set({
				comments: $scope.currentProject.comments,
				creationDate: $scope.currentProject.creationDate,
				title: $scope.currentProject.title,
				creator: $scope.currentProject.creator,
				summary: $scope.currentProject.summary,
				details: $scope.currentProject.details,
				owners: $scope.currentProject.owners,
				members: $scope.currentProject.members,
				subscribers: $scope.currentProject.subscribers,
				assets: $scope.currentProject.assets,
				likes: $scope.currentProject.likes,
				views: $scope.currentProject.views,
				tags: $scope.currentProject.tags,
				photo: $scope.currentProject.photo
			});

			if($scope.currentProject.assets){
				projectAddRef.assets = $scope.currentProject.assets;
			}

			if(ownersList){
				projectAddRef.owners = ownersList;
			}

			if($scope.currentProject.subscribers){
				projectAddRef.subscribers = $scope.currentProject.subscribers;
			}

			if($scope.currentProject.members && $scope.currentProject.members.length > 0){
				$scope.projectAddRef.members = objectsToIds($scope.currentProject.members);
			}

			var projectAddObj = $firebaseObject(projectAddRef);
			var addedID = $scope.currentProject.$id;

			for (var i=0; i < $scope.currentProject.tags.length; i++) {
				ref.child("tags").child($scope.currentProject.tags[i]).child("projects").child(addedID).set({
					project: $scope.currentProject.title
				});
			}

			for(var i=0; i < ownersList.length; i++) {
				ref.child("users").child(ownersList[i]).child("ownedProjects").child(addedID).set({
					project: $scope.currentProject.title
				});
			}

			for(var i=0; i < $scope.currentProject.members.length; i++) {
				ref.child("users").child($scope.currentProject.members[i]).child("memberProjects").child(addedID).set({
					project: $scope.currentProject.title
				});
			}
		}
		catch(error) {
			console.log('Error adding project to DB: ', error);
			$scope.cancel();
		}
	};

	objectsToIds = function(objArray) {
		if(objArray){
			var idArray = [];
			for (var i=0; i < objArray.length; i++) {
				idArray.push(objArray[i].$id);
			}

			return idArray;			
		} else {
			return [];
		}

	}

	validateData = function() {
		console.log("here x1");
		if($scope.currentProject.photo == ""){
			$scope.currentProject.photo = "https://community.dynamics.com/cfs-filesystemfile/__key/msdenhancedbloggingcfs/FeaturedImages/227825_5F00_Modern-Workplace.jpg";
		}
		if ($scope.currentProject.title === "") {
			$scope.invalidTitle = true;
			$scope.invalidTags = false;
			return false;
		}
		else if ($scope.currentProject.tags.length === 0) {
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
		$scope.currentProject.owners.splice($scope.currentProject.owners.indexOf(owner), 1);
		//add to list of available owners
		$scope.allUsers.push(owner);
	}

	$scope.removeMember = function(member) {
		$scope.currentProject.members.splice($scope.currentProject.members.indexOf(member), 1);
		$scope.allUsers.push(member);
	}

	$scope.removeSubscriber = function(subscriber) {
		$scope.currentProject.subscribers.splice($scope.currentProject.subscribers.indexOf(subscriber), 1);
		$scope.allUsers.push(subscriber);
	}

	$scope.addOwner = function() {
		//check that owner is valid
		if($scope.allUsers.indexOf($scope.selectedOwner) >= 0) {
			//add owner ID to the database
			$scope.currentProject.owners.push($scope.selectedOwner);
			//remove from available owners for project
			$scope.allUsers.splice($scope.allUsers.indexOf($scope.selectedOwner), 1);
			$scope.selectedOwner = "";
		} else {
			console.log("error, not a real user");
		}

	}

	$scope.addMember = function() {
		if ($scope.allUsers.indexOf($scope.selectedMember) >= 0) {
			$scope.currentProject.members.push($scope.selectedMember);
			$scope.allUsers.splice($scope.allUsers.indexOf($scope.selectedMember), 1);
			$scope.selectedMember = "";
		} else {
			console.log("error, not a real user");
		}

	}

	$scope.addSubscriber = function() {
		if ($scope.allUsers.indexOf($scope.selectedSubscriber) >= 0) {
			$scope.currentProject.subscribers.push($scope.selectedSubscriber);
			$scope.allUsers.splice($scope.allUsers.indexOf($scope.selectedSubscriber), 1);
			$scope.selectedSubscriber = "";
		} else {
			console.log("error, not a real user");
		}
	}

	$scope.addTag = function() {
		$scope.currentProject.tags.push($scope.selectedTag);
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
