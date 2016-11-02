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

	$scope.project = {
		title: "Improving Q",
		summary: "I would like to improve Q by adding automatic workplace integration. This allows for a more efficient workplace.",
		detail: "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
		photo: "../../assets/img/modern_workplace.jpg",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Chris Martin"],
		members: ["Johhny Dude", "Other Person"],
		subscribers: ["first", "second", "third"],
		tags: ["JavaScript", "HTML", "CSS"],
		assets: [],
		comments: 10,
		likes: 12,
		views: 125
	};

	$scope.updates = [{
		title: "Sample title here",
		description: "This is a simple description for this update right here.",
		user: "Kyle Wahl",
		date: "Wed Nov 02 2016 08:24:21 GMT-0500 (Central Daylight Time)"
	}];

	for(var i = 0; i < $scope.updates.length; i++){
		$scope.updates[i].date = new Date($scope.updates[i].date);
		$scope.updates[i].date = $scope.updates[i].date.toLocaleString([], {hour: '2-digit', minute: '2-digit', month: '2-digit', day: '2-digit', year: '2-digit'});
	}
});
