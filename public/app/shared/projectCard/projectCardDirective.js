angular.module('main').directive('projectCard', function() {

    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/app/shared/projectCard/projectCardView.html";

    directive.scope = {
    	image : "=image",
        title : "=title",
        summary : "=summary",
        likes : "=likes",
        views : "=views",
        comments : "=comments",
        details : "=details"
    }

    return directive;

});
