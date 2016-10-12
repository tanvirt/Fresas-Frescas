angular.module('main').controller('ErrorController', function($scope, $firebaseArray, $state) {
	$scope.heading = "404";
	$scope.subheading = "Lost Berries. Please return them to one of these pages.";
	$scope.headingImage = "../../assets/img/tinted_lost_berries.jpg";

});
