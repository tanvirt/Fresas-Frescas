angular.module('main').controller('HomeController', function($rootScope, $scope, $firebaseArray, $firebaseAuth, $state, $firebaseObject) {
	
	var video = new Video('https://www.youtube.com/watch?v=WVPRkcczXCY', 132, 160);
	VideoPlayer.play([video], function(event) {
		var currentTime = event.time;
		$scope.headingImage = "";
		$scope.$digest();
		console.log("video started");
	});

	// App header variables
	$scope.heading = "BUILD SOMETHING AMAZING";
	$scope.subheading = "Create meaningful and lasting relationships.";
	$scope.headingImage = "../../assets/img/video_start.png";

	var ref = firebase.database().ref();

	// create a synchronized array
	$scope.messages = $firebaseArray(ref.child("messages"));

	$scope.projectList = $firebaseArray(ref.child("projects"));

	// getting current user
	$rootScope.authObj = $firebaseAuth();
	$scope.user = $rootScope.authObj.$getAuth();

	// getting tags for the user for recommended
	$rootScope.authObj.$onAuthStateChanged(function(user) {
        if(user) {
        	//$scope.userTag =
        }
    })

	// wait for data to load
	$scope.projectList.$loaded()
	.then(function() {
		$scope.numProjects = $scope.projectList.length;
		setFeaturedProject();
		setPopularProject();
	})
	.catch(function(err) {
		console.error(err);
	});

	// add new items to the array
	// the message is automatically added to our Firebase database!
	$scope.addMessage = function() {

		if($scope.newMessageText === "i like da berry"){
			$scope.homeImage = "../../assets/img/tinted_strawberry.jpg";
		}
		else if($scope.newMessageText === "i like da choco"){
			$scope.homeImage = "../../assets/img/tinted_choco.jpg";
		}
		else {
			$scope.messages.$add({
				text: $scope.newMessageText
			});			
		}		
	};

	$scope.signOut = function() {
		$scope.authObj.$signOut();
		$state.go('login');
	}

	$scope.goToCreateProjectsPage = function() {
		$state.go('createProject');
	}

	// $scope.like = function() {
		
	// }

	random = function() {
		return Math.floor((Math.random() * $scope.numProjects));
	}

	setFeaturedProject = function() {
		// random freatured project
		var rand = random();
		var featuredProject = $scope.projectList[rand];
		console.log(featuredProject.summary);
		$scope.featured = {
			title: featuredProject.title,
			description: featuredProject.summary,
			owners: objectsToIds(featuredProject.owners),
			imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
			likes: featuredProject.likes,
			views: featuredProject.views
		}
	}

	setRecommendedProjects = function() {

	}

	objectsToIds = function(objArray) {
		var idArray = [];

		for (var i=0; i < objArray.length; i++) {
			var user = ref.child("users").child(objArray[i]);
			var userObject = $firebaseObject(user);
			userObject.$loaded().then(function() {
				console.log(userObject);
				var firstName = userObject.firstName;
				var lastName = userObject.lastName;
				console.log(firstName + " " + lastName);
				idArray.push(firstName + " "  + lastName);
			})
		}
		console.log(idArray);
		return idArray;
	}

	setPopularProject = function() {
		var likes = 0;
		var views = 0;
		var popular;
		for(project = 0; project < $scope.numProjects; project++) {
			//console.log("likes: " + likes + "views: " + views);
			//console.log("Project likes: " + $scope.projectList[project].likes + " Project views: " + $scope.projectList[project].views/20)
			if((likes + views/20) < ($scope.projectList[project].likes + $scope.projectList[project].views/20)) {
				likes = $scope.projectList[project].likes;
				views = $scope.projectList[project].views;
				popular = $scope.projectList[project];
				//console.log("CHANGES");
			}
		}
		console.log(popular);
		$scope.popularProject = {
			title: popular.title,
			description: popular.summary,
			owners: objectsToIds(popular.owners),
			imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
			likes: popular.likes,
			views: popular.views
		}
	}

	$scope.recommendedProjects = [{
		title: "Test Title",
		summary: "I am typing a summary here. This is a fantastic project. Good for this person",
		description: "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234,
		link: "https://www.youtube.com/watch?v=3ECwzCUw3a4"
	},
	{
		title: "Test Title",
		summary: "I am typing a summary here. This is a fantastic project. Good for this person",
		description: "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234,
		link: "https://www.youtube.com/watch?v=3ECwzCUw3a4"
	},
	{
		title: "Test Title",
		summary: "I am typing a summary here. This is a fantastic project. Good for this person",
		description: "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234,
		link: "https://www.youtube.com/watch?v=3ECwzCUw3a4"
	}];

	$scope.newProjects = [{
		title: "Test Title",
		summary: "I am typing a summary here. This is a fantastic project. Good for this person",
		description: "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234,
		link: "https://www.youtube.com/watch?v=3ECwzCUw3a4"
	},
	{
		title: "Test Title",
		summary: "I am typing a summary here. This is a fantastic project. Good for this person",
		description: "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234,
		link: "https://www.youtube.com/watch?v=3ECwzCUw3a4"
	},
	{
		title: "Test Title",
		summary: "I am typing a summary here. This is a fantastic project. Good for this person",
		description: "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234,
		link: "https://www.youtube.com/watch?v=3ECwzCUw3a4"
	}];

});
