angular.module('main').controller('ViewProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $firebaseObject, $state, $stateParams) {
	//this case shouldn't ever happen but....
	if ($stateParams.projectId === null) {
		$scope.myProjectId = "fill this with something";
	} else {
		$scope.myProjectId = $stateParams.projectId;
	}

	$scope.isOwner = true; // TEMPORARY

	$scope.ownerObjs = [];
	$scope.memberObjs = [];
	var ref = firebase.database().ref();
	var currProjectRef = ref.child("projects").child($scope.myProjectId);
	var currentProject = {};
	var projectData = $firebaseObject(ref.child("projects").child($scope.myProjectId));
//	var projectData = $firebaseObject(ref.child("projects").child($scope.myProjectId));
	projectData.$loaded().then(function() {
		//projectData.$bindTo($scope, "currentProject");
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

		//get owner and member objects
		for(var i=0; i < projectData.owners.length; i++) {
			convertIdToObj(projectData.owners[i], "owner");
		}
		for(var i=0; i < projectData.members.length; i++) {
			convertIdToObj(projectData.members[i], "member");
		}
	})

	// App header variables
	//$scope.heading = "Project Title";
	$scope.headingImage = "../../assets/img/computer.jpg";

	convertIdToObj = function(id, type) {
		var personObj = $firebaseObject(ref.child("users").child(id));

		if (type === "owner") {
			$scope.ownerObjs.push(personObj);
		} else if (type === "member") {
			$scope.memberObjs.push(personObj);
		}
	}
	/*var currProjectRef = ref.child("projects").child($scope.projectID);
	$scope.projectObject = $firebaseObject(currProjectRef);*/
	$scope.comments = $firebaseArray(currProjectRef.child("comments"));

	$scope.comments.$loaded().then(function() {
		$scope.comments.reverse();
	})
	$scope.updates = $firebaseArray(currProjectRef.child("updates"));
	$scope.updates.$loaded().then(function() {
		$scope.updates.reverse();
	})


	$scope.newComment = "";
	$scope.addComment = function() {
		var firebaseUser = $scope.authObj.$getAuth();
		var currentUser = $firebaseObject(ref.child("users").child(firebaseUser.uid));
		var dateStamp = new Date();
		dateStamp = dateStamp.toLocaleString([], {hour: '2-digit', minute: '2-digit', month: '2-digit', day: '2-digit', year: '2-digit'});
		try {
			currentUser.$loaded().then(function() {
				currProjectRef.child("comments").push({
					user: {
						userID: currentUser.$id,
						firstName: currentUser.firstName,
						lastName: currentUser.lastName
					},
					text: $scope.newComment,
					date: dateStamp
				})
				$scope.newComment = "";
				$scope.comments = $firebaseArray(currProjectRef.child("comments"));
				$scope.comments.$loaded().then(function() {
					$scope.comments.reverse();
				})
				sendCommentNotification(currentUser, dateStamp);
			})
		}
		catch(error) {
			console.log('Error adding comment to DB: ', error);
		}
		// addSubscriber();
	}


	$scope.updateTitle = "";
	$scope.updateText = "";
	$scope.addUpdate = function() {
		var firebaseUser = $scope.authObj.$getAuth();
		var currentUser = $firebaseObject(ref.child("users").child(firebaseUser.uid));

		var dateStamp = new Date();
		dateStamp = dateStamp.toLocaleString([], {hour: '2-digit', minute: '2-digit', month: '2-digit', day: '2-digit', year: '2-digit'});

		try {
			currentUser.$loaded().then(function() {
				currProjectRef.child("updates").push({
					user: {
						userID: currentUser.$id,
						firstName: currentUser.firstName,
						lastName: currentUser.lastName
					},
					title: $scope.updateTitle,
					description: $scope.updateText,
					date: date
				})
				$scope.updateTitle = "";
				$scope.updateText = "";
				$scope.updates = $firebaseArray(currProjectRef.child("updates"));
				$scope.updates.$loaded().then(function() {
					$scope.updates.reverse();
				})
				sendUpdateNotification(currentUser, dateStamp);
			})
		}
		catch(error) {
			console.log('Error adding comment to DB: ', error);
		}
	}

	$scope.addSubscriber = function() {
		var firebaseUser = $scope.authObj.$getAuth();
		var currentUser = $firebaseObject(ref.child("users").child(firebaseUser.uid));

		try {
			currentUser.$loaded().then(function() {
				currProjectRef.child("subscribers").child(currentUser.$id)
			})
		}
		catch(error) {
			console.log('Error adding comment to DB: ', error);
		}
	}

	sendCommentNotification = function(user, dateAdd) {
		var notificationText = "The Project " + $scope.projectObject.title + " has a new comment.";
		var notificationTitle = "New Comment";
		projectOwners = $firebaseArray(currProjectRef.child("owners"));
		projectMembers = $firebaseArray(currProjectRef.child("members"));

		projectOwners.$loaded().then(function() {
			angular.forEach(projectOwners, function(owner) {
				if (owner.$value != user.$id) {
					ref.child("users").child(owner.$value).child("notifications").push({
						projectID: $scope.projectObject.$id,
						projectTitle: $scope.projectObject.title,
						title: notificationTitle,
						text: notificationText,
						date: dateAdd,
						type: "non-interactive"
					})
				}
			})
		})
		projectMembers.$loaded().then(function() {
			angular.forEach(projectMembers, function(member) {
				if (member.$value != user.$id) {
					ref.child("users").child(member.$value).child("notifications").push({
						projectID: $scope.projectObject.$id,
						projectTitle: $scope.projectObject.title,
						title: notificationTitle,
						text: notificationText,
						date: dateAdd,
						type: "non-interactive"
					})
				}
			})
		})
	}

	sendUpdateNotification = function(user, dateAdd) {
		var notificationText = "The Project " + $scope.projectObject.title + " has a new update.";
		var notificationTitle = "New Update";
		projectOwners = $firebaseArray(currProjectRef.child("owners"));
		projectMembers = $firebaseArray(currProjectRef.child("members"));
		projectSubscribers = $firebaseArray(currProjectRef.child("subscribers"));

		projectOwners.$loaded().then(function() {
			angular.forEach(projectOwners, function(owner) {
				if (owner.$value != user.$id) {
					ref.child("users").child(owner.$value).child("notifications").push({
						projectID: $scope.projectObject.$id,
						projectTitle: $scope.projectObject.title,
						title: notificationTitle,
						text: notificationText,
						date: dateAdd,
						type: "non-interactive"
					})
				}
			})
		})
		projectMembers.$loaded().then(function() {
			angular.forEach(projectMembers, function(member) {
				if (member.$value != user.$id) {
					ref.child("users").child(member.$value).child("notifications").push({
						projectID: $scope.projectObject.$id,
						projectTitle: $scope.projectObject.title,
						title: notificationTitle,
						text: notificationText,
						date: dateAdd,
						type: "non-interactive"
					})
				}
			})
		})
		projectSubscribers.$loaded().then(function() {
			angular.forEach(projectSubscribers, function(subscriber) {
				if (subscriber.$value != user.$id) {
					ref.child("users").child(subscriber.$value).child("notifications").push({
						projectID: $scope.projectObject.$id,
						projectTitle: $scope.projectObject.title,
						title: notificationTitle,
						text: notificationText,
						date: dateAdd,
						type: "non-interactive"
					})
				}
			})
		})
	}

	/*$scope.updates = [{
		title: "Sample title here",
		description: "This is a simple description for this update right here.",
		user: "Kyle Wahl",
		date: "Wed Nov 02 2016 08:24:21 GMT-0500 (Central Daylight Time)"
	}];*/

	for(var i = 0; i < $scope.updates.length; i++){
		$scope.updates[i].date = new Date($scope.updates[i].date);
		$scope.updates[i].date = $scope.updates[i].date.toLocaleString([], {hour: '2-digit', minute: '2-digit', month: '2-digit', day: '2-digit', year: '2-digit'});
	}

	$scope.editProject = function() {
		console.log($scope.myProjectId);
		$state.go("editProject", {editProjectId: $scope.myProjectId});
	}

	$scope.likeClicked = function(){
            console.log("liked");
        };

	// addSubscriber();
});
