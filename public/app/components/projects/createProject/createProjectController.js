angular.module('main').controller('CreateProjectController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $state) {

	$scope.addProjectToDatabase = function() {
		var ref = firebase.database().ref().child("projects");
		$scope.projects = $firebaseArray(ref);
		$scope.projects.$add({
			description: "blahblah",
			owners: 'whoopa'
		});
	};
});