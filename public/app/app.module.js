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

	$rootScope.loggedIn = false;

	//$state.go('login');

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
		if(toState.name == "home" && $rootScope.loggedIn == true) {
			console.log("logged in successfully");
			event.preventDefault();
			$state.go('home');
		}
		else if(toState.name == "login") {
			console.log("IN LOGIN BLAH");
			event.preventDefault();
			$state.go('login');
		}
	});
});
