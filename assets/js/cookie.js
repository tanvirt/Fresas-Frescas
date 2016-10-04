function Cookie(name) {
	this._name = name;
}

Cookie.prototype.setValue = function(value, numDaysUntilExpired) {
	var date = new Date();
	var expirationDate = date.getTime() + (numDaysUntilExpired*24*60*60*1000);
	date.setTime(expirationDate);
	var expires = "expires=" + date.toUTCString();
	document.cookie = this._name + "=" + value + "; " + expires;
}

Cookie.prototype.getValue = function() {
	var name = this._name + "=";
	var cookies = document.cookie.split(';');
	for(var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
        while(cookie.charAt(0) == ' ') {
        	cookie = cookie.substring(1);
        }
        if(cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

Cookie.prototype.isSet = function() {
	return this.getValue() != "";
}
