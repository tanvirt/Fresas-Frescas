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
		description: "I am typing a description here. This is a fantastic project. Good for this person",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234
	}

	$scope.recommendedProjects = [{
		title: "Test Title",
		description: "I am typing a description here. This is a fantastic project. Good for this person",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234
	},
	{
		title: "Test Title",
		description: "I am typing a description here. This is a fantastic project. Good for this person",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234
	},
	{
		title: "Test Title",
		description: "I am typing a description here. This is a fantastic project. Good for this person",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234
	},
	{
		title: "Test Title",
		description: "I am typing a description here. This is a fantastic project. Good for this person",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234
	},
	{
		title: "Test Title",
		description: "I am typing a description here. This is a fantastic project. Good for this person",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234
	},
	{
		title: "Test Title",
		description: "I am typing a description here. This is a fantastic project. Good for this person",
		owners: ["Kyle Wahl", "Tanvir Talukder", "Jason Ngo"],
		imgSrc: "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
		likes: 77,
		views: 234
	}];

});
