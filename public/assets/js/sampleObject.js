function SimpleObject() {
	this._property1 = "";
	this._property2 = "";
}

SimpleObject.prototype.toJSON = function() {
	return {
		property1: this._property1,
		property2: this._property2
	};
}



function ComplexObject() {
	this._arrayOfStrings = [];
	this._simpleObject = null; // unlikey to have objects as properties
	this._arrayOfObjects = []; // very unlikely to have an array of objects as properties
}

ComplexObject.prototype.toJSON = function() {
	var arrayOfObjectsInJSON = []; // once again, very unlikely to be needed
	for(object in arrayOfObjects) {
		arrayOfObjects.push(object.toJSON());
	}

	return {
		property: this._property,
		simpleObject: this._simpleObject.toJSON(), // once again, unlikely to be needed
		arrayOfObjects: arrayOfObjectsInJSON
	};
}
