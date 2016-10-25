function SimpleObject() {
	this._property = "";
}

SimpleObject.prototype.toJSON = function() {
	return {
		property: this._property
	};
}



function ComplexObject() {
	this._arrayOfStrings = [];
	this._simpleObject = null; // unlikey to have objects as properties
	this._arrayOfObjects = []; // very unlikely to have an array of objects
}

SampleObject.prototype.toJSON = function() {
	var arrayOfObjectsInJSON = []; // once again, very unlikely to be needed
	for(object in arrayOfObjects) {
		arrayOfObjects.push(object.toJSON());
	}

	return {
		property: this._property,
		anotherObject: this._simpleObject.toJSON(), // one again, unlikely to be needed
		arrayOfObjects: arrayOfObjectsInJSON
	};
}
