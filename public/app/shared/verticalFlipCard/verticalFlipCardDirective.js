angular.module('main').directive('verticalFlipCard', function() {

    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/app/shared/verticalFlipCard/verticalFlipCardView.html";

    directive.scope = {
    	image: "=image",
        title : "=title",
        summary: "=summary",
        description: "=description",
        owners: "=owners",
        likes : "=likes",
        views: "=views",
        link: "=link"
    }

    return directive;

});
