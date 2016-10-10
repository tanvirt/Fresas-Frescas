angular.module('main').directive('appheader', function() {
    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/app/shared/header/headerView.html";

    directive.scope = {
        heading : "=heading",
        subheading : "=subheading"
    }

    return directive;
});
