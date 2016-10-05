angular.module('main', [
	"firebase", 
	"ngRoute",
	'ui.router'
]);

angular.module('main').run(function($rootScope, $state, $stateParams, $timeout) {
	$state.go('home');

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
		if(toState.name == "home") {
			$state.go('home');
		}
		else if(toState.name == "login") {
			$state.go('login');
		}
	});
});
