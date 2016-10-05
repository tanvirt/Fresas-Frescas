angular.module('main').controller('HomeController', function($scope, $firebaseArray, $state) {
	// $scope.inventory = ['apples', 'oranges', 'bananas'];

	$scope.loginImage = {
		background: 'url(../../assets/img/strawberry.jpg)'
	};

	console.log($scope.loginImage)
});
