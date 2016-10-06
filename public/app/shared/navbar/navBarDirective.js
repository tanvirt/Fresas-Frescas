angular.module('main').directive('navbar', function() {
    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/app/shared/navbar/navBarView.html";

    return directive;
});
