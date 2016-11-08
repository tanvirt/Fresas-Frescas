angular.module('main').directive('userCardMobile', function($state, $stateParams) {

    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "/app/shared/userCardMobile/userCardMobileView.html";

    directive.scope = {
    	image : "=image",
        title : "=title",
        summary : "=summary",
        details : "=details"
    }
    
    return directive;

});
