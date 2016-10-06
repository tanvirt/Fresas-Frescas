angular.module('main').directive('sidebar', function() {
    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/app/shared/sidebar/sideBarView.html";

    return directive;
});
