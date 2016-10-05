angular.module('main').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'app/components/home/homeView.html',
        controller: 'HomeController'
    });

    $stateProvider.state('login', {
        url: '/',
        templateUrl: 'app/components/login/loginView.html',
        controller: 'LoginController'
    });

});
