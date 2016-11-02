angular.module('main').controller('ViewProjectController', function($scope) {
	
	// App header variables
	$scope.heading = "Project Title";
	$scope.headingImage = "../../assets/img/computer.jpg";

	// Main content starts
	$scope.comments = [];
	
	var sampleComment1 = {
		user: {
			firstName: "Tanvir",
			lastName: "Talukder"
		},
		text: "This project looks really cool!",
		date: "11/2/2016 10:30 AM"
	};
	var sampleComment2 = {
		user: {
			firstName: "Tanvir",
			lastName: "Talukder"
		},
		text: "Nevermind I read the summary and it sucks!",
		date: "11/2/2016 10:45 AM"
	};
	var sampleComment3 = {
		user: {
			firstName: "Tanvir",
			lastName: "Talukder"
		},
		text: "Please don't tell my supervisor that I said that...",
		date: "11/2/2016 11:00 AM"
	};
	var sampleComment4 = {
		user: {
			firstName: "Tanvir",
			lastName: "Talukder"
		},
		text: "Alright, who the HELL reported me to Jill from HR!?",
		date: "11/2/2016 11:15 AM"
	};
	var sampleComment5 = {
		user: {
			firstName: "Douche",
			lastName: "Bag"
		},
		text: "#rekt",
		date: "11/2/2016 11:30 AM"
	};

	$scope.comments.push(sampleComment1);
	$scope.comments.push(sampleComment2);
	$scope.comments.push(sampleComment3);
	$scope.comments.push(sampleComment4);
	$scope.comments.push(sampleComment5);

});
