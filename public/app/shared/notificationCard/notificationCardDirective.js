angular.module('main').directive('notificationCard', function($state, $stateParams) {

    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/app/shared/notificationCard/notificationCardView.html";

    directive.scope = {
        title : "=title",
        text : "=text",
        projectTitle : "=projectTitle",
        projectId : "=projectId",
        date : "=date",
        interactive : "=interactive",
        userId : "=userId"
    };

    directive.link = function(scope, elem, attrs) {
        scope.goToProject  = function () {
            console.log(scope.projectid);
            $state.go("viewProject", {projectId: scope.projectid});
        };
    }

    return directive;

});
