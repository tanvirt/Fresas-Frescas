angular.module('main').controller('HomeController', function($scope, $firebaseArray, $state) {
	$scope.inventory = ['apples', 'oranges', 'bananas'];
});
