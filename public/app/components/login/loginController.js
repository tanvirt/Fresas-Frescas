angular.module('main').controller('LoginController', function($rootScope, $scope, $firebaseAuth, $state) {

	$scope.authObj = $firebaseAuth();

	$scope.login = function() {
		$scope.authObj.$signInWithEmailAndPassword($scope.username, $scope.password).then(function(firebaseUser) {
		  console.log("Signed in as:", firebaseUser.uid);
		  $rootScope.user = firebaseUser;
		  console.log($rootScope.user)
		  $state.go('home');
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		});
	}
});
