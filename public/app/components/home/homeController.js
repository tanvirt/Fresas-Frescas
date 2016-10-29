angular.module('main').controller('HomeController', function($rootScope, $scope, $firebaseArray, $firebaseAuth, $state) {
	
	// App header variables
	$scope.heading = "Fresas Frescas";
	$scope.subheading = "We have the freshest berries.";
	$scope.headingImage = "../../assets/img/tinted_strawberry.jpg";

	var ref = firebase.database().ref().child("messages");

	// create a synchronized array
	$scope.messages = $firebaseArray(ref);

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

	$scope.featured = {
		title: "Test Title",
		summary: "I am typing a summary here. This is a fantastic project. Good for this person. This project is fantastic and allows for collaboration across centers  The rest of this sentence is testing a longer summary paragraph.",
		description: "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234,
		link: "https://www.youtube.com/watch?v=3ECwzCUw3a4"
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

});
