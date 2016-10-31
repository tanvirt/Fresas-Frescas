angular.module('main').controller('MyProjectsController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $firebaseObject) {

	// App header variables
	$scope.heading = "My Projects";
	$scope.subheading = "Work hard, play hard.";
	$scope.headingImage = "../../assets/img/black_coffee.jpg";

	// Main content starts
	$scope.projectsOwning = [];
	$scope.projectsWorking = [];
	$scope.projectsFollowing = [];

	$scope.projectsOwningTitle = [];
	$scope.projectsWorkingTitle = [];
	$scope.projectsFollowingTitle = [];

	var projectRef = firebase.database().ref().child("projects");
	var projectList = $firebaseArray(projectRef);
	// var firebaseUser = "";
	$rootScope.authObj.$onAuthStateChanged(function(user) {
        if(user) {
        	var userRef = firebase.database().ref().child("users").child(user.uid)
        	var ownedList = $firebaseArray(userRef.child("ownedProjects"));
        	var memberList = $firebaseArray(userRef.child("memberProjects"));
        	var subscriberList = $firebaseArray(userRef.child("subscriberProjects"));
        	ownedList.$loaded().then(function() {
        		angular.forEach(ownedList, function(project) {
        			$scope.projectsOwningTitle.push(project);
        			console.log(project.$value);
        			$scope.projectsOwning.push($firebaseObject(projectRef.child(project.$value)));
        		})
        		console.log($scope.projectsOwningTitle);
        	})
        	memberList.$loaded().then(function() {
        		angular.forEach(memberList, function(project) {
        			$scope.projectsWorkingTitle.push(project);
        		})
        		console.log($scope.projectsWorkingTitle);
        	})
        	subscriberList.$loaded().then(function() {
        		angular.forEach(subscriberList, function(project) {
        			$scope.projectsFollowingTitle.push(project);
        		})
        		console.log($scope.projectsFollowingTitle);
        	})
       		// angular.forEach($scope.projectsOwningTitle, function(project) {
       		// 	var projectObj = $firebaseObject(projectRef.child(project.$value));
       		// 	console.log(projectObj);
       		// 	projectObj.$loaded().then(function() {
       		// 		$scope.projectsOwning.push(projectObj);
       		// 	})
       		// })
       		console.log($scope.projectsOwning);
        }
        else {
        	console.log("HASD;LFHALSDKJGHA");
        }
    })

	var firebaseUser = $scope.authObj.$getAuth();
	// if ($scope.firebaseUser.uid) {
	// 	console.log("logged in as: ", $scope.firebaseUser.uid);
	// }
	// else {
	// 	console.log("logged out");
	// }
	// projectList.$loaded().then(function() {
	// 	angular.forEach(projectList, function(project) {
	// 		angular.forEach(project, function(owners) {
				
	// 		})
	// 	})
	// });

});
