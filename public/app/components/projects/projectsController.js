angular.module('main').controller('ProjectsController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $state) {
	var ref = firebase.database().ref().child('projects');
	
});