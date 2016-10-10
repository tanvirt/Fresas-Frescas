angular.module('main').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider.state('login', {
        url: '/',
        templateUrl: 'app/components/login/loginView.html',
        controller: 'LoginController'
    });

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'app/components/home/homeView.html',
        controller: 'HomeController'
    });

    $stateProvider.state('404', {
        url: '/404',
        templateUrl: 'app/components/errorPage/errorView.html',
        controller: 'ErrorController'
    });

    $urlRouterProvider.otherwise('404');
});
