angular.module('main').directive('horizontalCard', function() {

    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/app/shared/horizontalCard/horizontalCardView.html";

    directive.scope = {
    	image: "=image",
        title : "=title",
        summary: "=summary",
        owners: "=owners",
        likes : "=likes",
        views: "=views"
    }

    return directive;

});
