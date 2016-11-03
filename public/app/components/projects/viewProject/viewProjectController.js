angular.module('main').controller('ViewProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $firebaseObject, $state, $stateParams) {
	$scope.myProjectId = $stateParams.projectId;
	console.log($scope.myProjectId);


	// Main content starts
	$scope.projectID = "-KV_RmwoD5Nd2R5gbGsF";

		// App header variables
	$scope.heading = "Project Title";
	$scope.headingImage = "../../assets/img/computer.jpg";
	
	var ref = firebase.database().ref();
	var currProjectRef = ref.child("projects").child($scope.projectID);
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
		var timestamp = new Date().getTime();
		var toDate = new Date(timestamp).getDate();
		var toMonth = new Date(timestamp).getMonth()+1;
		var toYear = new Date(timestamp).getFullYear();
		var hours = new Date(timestamp).getHours();
		var minutes = new Date(timestamp).getMinutes();
		var original_date = toMonth + '/' + toDate + '/' + toYear + " " + hours + ":" + minutes;
		try {
			currentUser.$loaded().then(function() {
				currProjectRef.child("comments").push({
					user: {
						userID: currentUser.$id,
						firstName: currentUser.firstName,
						lastName: currentUser.lastName
					},
					text: $scope.newComment,
					date: original_date
				})
				$scope.newComment = "";
				$scope.comments = $firebaseArray(currProjectRef.child("comments"));
				$scope.comments.$loaded().then(function() {
					$scope.comments.reverse();
				})
			})
		}
		catch(error) {
			console.log('Error adding comment to DB: ', error);
		}
	}

	$scope.updateTitle = "";
	$scope.updateText = "";
	addUpdate = function() {
		var firebaseUser = $scope.authObj.$getAuth();
		var currentUser = $firebaseObject(ref.child("users").child(firebaseUser.uid));

		var timestamp = new Date().getTime();
		var toDate = new Date(timestamp).getDate();
		var toMonth = new Date(timestamp).getMonth()+1;
		var toYear = new Date(timestamp).getFullYear();
		var hours = new Date(timestamp).getHours();
		var minutes = new Date(timestamp).getMinutes();
		var original_date = toMonth + '/' + toDate + '/' + toYear + " " + hours + ":" + minutes;

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
					date: original_date
				})
				$scope.updateTitle = "";
				$scope.updateText = "";
				$scope.updates = $firebaseArray(currProjectRef.child("updates"));
				$scope.updates.$loaded().then(function() {
					$scope.updates.reverse();
				})
			})
		}
		catch(error) {
			console.log('Error adding comment to DB: ', error);
		}
	}


	$scope.project = {
		title: "Improving Q",
		summary: "I would like to improve Q by adding automatic workplace integration. This allows for a more efficient workplace.",
		detail: "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
		photo: "../../assets/img/modern_workplace.jpg",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Chris Martin"],
		members: ["Johhny Dude", "Other Person"],
		subscribers: ["first", "second", "third"],
		tags: ["JavaScript", "HTML", "CSS"],
		assets: [],
		comments: 10,
		likes: 12,
		views: 125
	};

	$scope.updates = [{
		title: "Sample title here",
		description: "This is a simple description for this update right here.",
		user: "Kyle Wahl",
		date: "Wed Nov 02 2016 08:24:21 GMT-0500 (Central Daylight Time)"
	}];

	for(var i = 0; i < $scope.updates.length; i++){
		$scope.updates[i].date = new Date($scope.updates[i].date);
		$scope.updates[i].date = $scope.updates[i].date.toLocaleString([], {hour: '2-digit', minute: '2-digit', month: '2-digit', day: '2-digit', year: '2-digit'});
	}

	$scope.editProject = function() {
		console.log($scope.myProjectId);
		$state.go("editProject", {editProjectId: $scope.myProjectId});
	}

});
