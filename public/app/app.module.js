angular.module('main', [
	"firebase",
	'ui.router',
	'ui.bootstrap',
	'flow'
]);

angular.module('main').config(['flowFactoryProvider', function(flowFactoryProvider) {
	 flowFactoryProvider.defaults = {
    target: 'upload.php',
    permanentErrors: [404, 500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 4,
    singleFile: true
  };
  flowFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
  });

}]);

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

	Theme.init();

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
		else if(toState.name == 'profile') {
			$state.go('profile');
		}
		else if(toState.name == 'signUp') {
			$state.go('signUp');
		}
		else if(toState.name == 'createProject') {
			$state.go('createProject');
		}
		else if(toState.name == 'myProjects') {
			$state.go('myProjects');
		}
		else if(toState.name == 'search') {
			$state.go('search');
		}
		else if(toState.name == 'viewProject') {
			$state.go('viewProject');
		}
		else if(toState.name == 'editProject') {
			$state.go('editProject');
		}
		else if(toState.name == 'notifications') {
			$state.go('notifications');
		}
		else {
			$state.go('404');
		}
	});

});

angular.module('main').directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
