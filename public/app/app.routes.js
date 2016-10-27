angular.module('main').config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('login', {
            url: '/',
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
        })

        .state('signUp', {
            url: '/signUp',
            templateUrl: 'app/components/signUp/signUpView.html',
            controller: 'SignUpController' 
        })

        .state('createProject', {
            url: '/createProject',
            templateUrl: 'app/components/projects/createProject/createProjectView.html',
            controller: 'CreateProjectController'
        })

        .state('myProjects', {
            url: '/myProjects',
            templateUrl: 'app/components/projects/myProjects/myProjectsView.html',
            controller: 'MyProjectsController'
        });

    $urlRouterProvider.otherwise('404');

});
