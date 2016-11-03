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
        })

        .state('search', {
            url: '/search',
            templateUrl: 'app/components/search/searchView.html',
            controller: 'SearchController'
        })

        .state('notifications', {
            url: '/notifications',
            templateUrl: 'app/components/notifications/notificationsView.html',
            controller: 'NotificationsController'
        })

        .state('viewProject', {
            url: '/viewProject',
            templateUrl: 'app/components/projects/viewProject/viewProjectView.html',
            controller: 'ViewProjectController'
        });

    $urlRouterProvider.otherwise('404');

});
