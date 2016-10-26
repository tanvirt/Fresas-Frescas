angular.module('main', [
	"firebase",
	'ui.router'
]);

angular.module('main').run(function($rootScope, $state, $firebaseAuth) {

	// Initialize the Firebase SDK
	var config = {
		apiKey: 'AIzaSyDj-RpgjMaBjMIFGWnptH23LGjlQ_Wpizg ',
		authDomain: 'fresas-frescas.firebaseapp.com',
		databaseURL: 'https://fresas-frescas.firebaseio.com',
		storageBucket: 'https://fresas-frescas.appspot.com'
	};
	firebase.initializeApp(config);

	$rootScope.authObj = $firebaseAuth();
	$rootScope.user = $rootScope.authObj.$getAuth();

	$rootScope.listeners = [];

	$rootScope.addListener = function(listener) {
		$rootScope.listeners.push(listener);
	}

    $rootScope.authObj.$onAuthStateChanged(function(user) {
        if(user) {
        	$rootScope.user = user;
        	console.log($rootScope.user);
        	if($state.current.name == 'login') {
            	$state.go('home');
        	}
        	for(i in $rootScope.listeners) {
        		$rootScope.listeners[i].onUserAuth(user);
        	}
        }
        else {
        	if($state.current.name == 'signUp') {
        		return;
        	}
        	else if($state.current.name != 'login') {
        		$state.go('login');
        	}
        }
    })

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
		if(toState.name == "home") {
			$state.go('home');
		}
		else if(toState.name == "login") {
			$state.go('login');
		}
		else if(toState.name == 'settings') {
			$state.go('settings');
		}
		else if (toState.name == 'signUp') {
			$state.go('signUp');
		}
		else if (toState.name == 'createProject') {
			$state.go('createProject');
		}
		else {
			$state.go('404');
		}
	});

});
