angular.module('main').directive('projectCardMobile', function($state, $stateParams) {

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
        details : "=details",
        projectid : "=projectid"
    }


    directive.link = function(scope, elem, attrs) {
        scope.goToProject  = function () {
            console.log(scope.projectid);
            $state.go("viewProject", {projectId: scope.projectid});
        };
    }
    
    return directive;

});
