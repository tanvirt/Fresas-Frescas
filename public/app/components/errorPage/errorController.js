angular.module('main').controller('ErrorController', function($scope, $state) {

	$scope.heading = "Error 404";
	$scope.subheading = "Error,please return them to one of these pages.";
	$scope.headingImage = "../../assets/img/404.jpg";

	$scope.goHome = function() {
		$state.go('home');
	}

	$scope.goSettings = function() {
		$state.go('settings');
	}

});
