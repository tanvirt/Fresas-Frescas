angular.module('main').controller('ErrorController', function($scope, $state) {

	$scope.heading = "404";
	$scope.subheading = "Lost Berries. Please return them to one of these pages.";
	$scope.headingImage = "../../assets/img/tinted_lost_berries.jpg";

	$scope.goHome = function() {
		$state.go('home');
	}

	$scope.goSettings = function() {
		$state.go('settings');
	}

});
