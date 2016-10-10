angular.module('main').controller('SettingsController', function($scope, $firebaseArray, $state) {
	$scope.heading = "Settings";
	$scope.subheading = "Our berries will change your life.";
	$scope.homeImage = "../../assets/img/tinted_settings.jpg";
});
