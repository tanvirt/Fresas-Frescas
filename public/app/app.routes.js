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
        })

        .state('settings', {
            url: '/settings',
            templateUrl: 'app/components/settings/settingsView.html',
            controller: 'SettingsController',
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
        })

        .state('404', {
            url: '/404',
            templateUrl: 'app/components/errorPage/errorView.html',
            controller: 'ErrorController',
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
