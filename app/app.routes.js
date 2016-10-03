angular.module('main').config(function($routeProvider) {

    $routeProvider.when("/login", {
        templateUrl : "components/home/loginView.html",
        controller : "LoginController"
    });

    $routeProvider.when("/home", {
        templateUrl : "components/home/homeView.html",
        controller : "HomeController"
    });

    $routeProvider.otherwise({
    	template : "<h1>Invalid URL</h1>"
    });

});
