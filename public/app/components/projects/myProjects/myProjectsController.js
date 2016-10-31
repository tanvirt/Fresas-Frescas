angular.module('main').controller('MyProjectsController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $firebaseObject) {

	// App header variables
	$scope.heading = "My Projects";
	$scope.subheading = "Work hard, play hard.";
	$scope.headingImage = "../../assets/img/black_coffee.jpg";

	// Main content starts
	$scope.projectsOwning = [];
	$scope.projectsWorking = [];
	$scope.projectsFollowing = [];

	var projectRef = firebase.database().ref().child("projects");
	var projectList = $firebaseArray(projectRef);

	$rootScope.authObj.$onAuthStateChanged(function(user) {
        if(user) {
        	var userRef = firebase.database().ref().child("users").child(user.uid)
        	var ownedList = $firebaseArray(userRef.child("ownedProjects"));
        	var memberList = $firebaseArray(userRef.child("memberProjects"));
        	var subscriberList = $firebaseArray(userRef.child("subscriberProjects"));
        	ownedList.$loaded().then(function() {
        		angular.forEach(ownedList, function(project) {
        			$scope.projectsOwning.push($firebaseObject(projectRef.child(project.$value)));
        		})
        	})
        	memberList.$loaded().then(function() {
        		angular.forEach(memberList, function(project) {
        			$scope.projectsWorking.push($firebaseObject(projectRef.child(project.$value)));
        		})
        	})
        	subscriberList.$loaded().then(function() {
        		angular.forEach(subscriberList, function(project) {
        			$scope.projectsFollowing.push($firebaseObject(projectRef.child(project.$value)));
        		})
        	})
        }
        else {
        	console.log("No user logged in, weird error");
        }
    })

});
