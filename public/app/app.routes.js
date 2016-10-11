angular.module('main').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('login', {
            resolve: {
                'authStatus': ['$rootScope', '$firebaseAuth', '$state', function($rootScope, $firebaseAuth, $state) {
                    $rootScope.authObj = $firebaseAuth();
                    $rootScope.authObj.$onAuthStateChanged(function(user) {
                        console.log(user);
                        if (user) {
                            $state.go('home');
                        }
                    })
                }]
            },
            url: '/login',
            templateUrl: 'app/components/login/loginView.html',
            controller: 'LoginController'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'app/components/home/homeView.html',
            controller: 'HomeController',
            resolve: {
                'authStatus': ['$rootScope', '$firebaseAuth', '$state', function($rootScope, $firebaseAuth, $state) {
                    $rootScope.authObj = $firebaseAuth();
                    $rootScope.authObj.$onAuthStateChanged(function(user) {
                        console.log(user);
                        if (!user) {
                            $state.go('login');
                        }
                    })
                }]
            }
        });
    $urlRouterProvider.otherwise('/home');
});

angular.module('main').factory("Auth", [function($firebaseAuth) {
    return $firebaseAuth();
}])