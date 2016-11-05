angular.module('main').directive('projectCard', function($state, $stateParams) {

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
        details : "=details",
        projectid : "=projectid"
    };

    directive.link = function(scope, elem, attrs) {
        scope.goToProject  = function () {
            console.log(scope.projectid);
            $state.go("viewProject", {projectId: scope.projectid});
        };

        scope.likeClicked = function(){
            console.log("liked");
        };
    }

    return directive;

});
