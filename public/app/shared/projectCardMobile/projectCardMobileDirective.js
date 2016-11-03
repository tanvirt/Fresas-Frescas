angular.module('main').directive('projectCardMobile', function() {

    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/app/shared/projectCardMobile/projectCardMobileView.html";

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
