angular.module('main').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/components/login/loginView.html',
            controller: 'LoginController'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'app/components/home/homeView.html',
            controller: 'HomeController'
        })

        .state('settings', {
            url: '/settings',
            templateUrl: 'app/components/settings/settingsView.html',
            controller: 'SettingsController'
        })

        .state('404', {
            url: '/404',
            templateUrl: 'app/components/errorPage/errorView.html',
            controller: 'ErrorController' 
        });
    $urlRouterProvider.otherwise('404');
});
