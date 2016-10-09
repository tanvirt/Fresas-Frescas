function Cookie() {}

Cookie.setValue = function(name, value, numDaysUntilExpired) {
	var date = new Date();
	var expirationTime = date.getTime() + (numDaysUntilExpired*24*60*60*1000);
	date.setTime(expirationTime);
	var expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + "; " + expires;
}

Cookie.getValue = function(name) {
	var cookie_name = name + "=";
	var cookies = document.cookie.split(';');
	for(var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
        while(cookie.charAt(0) == ' ') {
        	cookie = cookie.substring(1);
        }
        if(cookie.indexOf(cookie_name) == 0) {
            return cookie.substring(cookie_name.length, cookie.length);
        }
    }
    return "";
}

Cookie.isSet = function(name) {
	return this.getValue(name) != "";
}
