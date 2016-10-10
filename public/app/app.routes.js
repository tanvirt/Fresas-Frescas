angular.module('main').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/components/login/loginView.html',
        controller: 'LoginController'
    });

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'app/components/home/homeView.html',
        controller: 'HomeController'
    });

    $urlRouterProvider.otherwise('home')
});
