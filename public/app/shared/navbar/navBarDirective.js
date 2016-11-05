angular.module('main').directive('navbar', function($state) {

    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/app/shared/navbar/navBarView.html";

    directive.link = function(scope, elem, attrs) {
        scope.goToProfile  = function () {
            $state.go("profile");
        };
    }

    return directive;

});
