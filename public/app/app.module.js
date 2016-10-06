angular.module('main', [
	"firebase", 
	"ngRoute",
	'ui.router'
]);

angular.module('main').run(function($rootScope, $state, $stateParams, $timeout) {
	// Initialize the Firebase SDK
	var config = {
		apiKey: 'AIzaSyDj-RpgjMaBjMIFGWnptH23LGjlQ_Wpizg ',
		authDomain: 'fresas-frescas.firebaseapp.com',
		databaseURL: 'https://fresas-frescas.firebaseio.com',
		storageBucket: 'https://fresas-frescas.appspot.com'
	};
	firebase.initializeApp(config);

	$state.go('login');

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
		if(toState.name == "home") {
			$state.go('home');
		}
		else if(toState.name == "login") {
			console.log("IN LOGIN BLAH")
			$state.go('login');
		}
	});
});
