angular.module('main').controller('SearchController', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject) {

	// App header variables
	$scope.heading = "FIND SOMETHING NEW";
	$scope.subheading = "There is a whole world out there.";
	$scope.headingImage = "../../assets/img/world.jpg";

	// Main content starts
	$scope.searchText = "";
	var ref = firebase.database().ref();

	$scope.projectSearchResults = {};
	$scope.userSearchResults = {};
	$scope.tagSearchMapProjectResults = {};
	$scope.tagSearchMapUserResults = {};

	$scope.displayedList = {};
	$scope.filter = "project";

	$scope.mobile = Mobile.isPhone();

	$scope.search = function() {
		console.log("search");
		if ($scope.filter == "project") {
			$scope.searchProjects();
		} else if ($scope.filter == "user") {
			$scope.searchUserByName();
		} else if ($scope.filter == "project tag") {
			$scope.searchTagsProjects();
		} else if ($scope.filter == "user tag") {
			$scope.searchTagUsers();
		}
	}

	$scope.searchProjects = function() {
		console.log("search projects");
		var projectList = $firebaseArray(ref.child("projects"));
		$scope.searchText = ($scope.searchText).toLowerCase();

		$scope.projectSearchResults = {};

		var projectSearchText = [];
		var projectSearchIndex = [];

		projectList.$loaded().then(function() {
			angular.forEach(projectList, function(project) {
				projectSearchText.push((project.title + " " + project.summary).toLowerCase());
			})
			for (var i = 0; i < projectSearchText.length; i++) {
				if (projectSearchText[i].indexOf($scope.searchText) !== -1) {
					projectSearchIndex.push(i);
				}
			}
			angular.forEach(projectSearchIndex, function(index) {
				$scope.projectSearchResults[projectList[index].$id] = $firebaseObject(ref.child("projects").child(projectList[index].$id));
			})
			$scope.displayedList = $scope.projectSearchResults;
		})
		
	}

	$scope.searchTagsProjects = function() {
		var tagList = $firebaseArray(ref.child("tags"));
		$scope.searchText = ($scope.searchText).toLowerCase();

		$scope.tagSearchMapProjectResults = {};

		var tagSearchMatches = [];
		var tagSearchResults = [];

		tagList.$loaded().then(function() {
			angular.forEach(tagList, function(tag) {
				if (tag.$id.indexOf($scope.searchText) !== -1) {
					tagSearchMatches.push($firebaseArray(ref.child("tags").child(tag.$id).child("projects")));
				}
			})
			angular.forEach(tagSearchMatches, function(tagProjects) {
				tagProjects.$loaded().then(function() {
					angular.forEach(tagProjects, function(project) {
						$scope.tagSearchMapProjectResults[project.$id] = $firebaseObject(ref.child("projects").child(project.$id));
					})
				})
			})
			$scope.displayedList = $scope.tagSearchMapProjectResults;
		})
	}

	$scope.searchTagUsers = function() {
		var tagList = $firebaseArray(ref.child("tags"));
		$scope.searchText = ($scope.searchText).toLowerCase();

		$scope.tagSearchMapUserResults = {};

		var tagSearchMatches = [];
		var tagSearchResults = [];

		tagList.$loaded().then(function() {
			angular.forEach(tagList, function(tag) {
				if (tag.$id.indexOf($scope.searchText) !== -1) {
					tagSearchMatches.push($firebaseArray(ref.child("tags").child(tag.$id).child("users")));
				}
			})
			angular.forEach(tagSearchMatches, function(tagUsers) {
				tagUsers.$loaded().then(function() {
					angular.forEach(tagUsers, function(user) {
						$scope.tagSearchMapUserResults[user.$id] = $firebaseObject(ref.child("users").child(user.$id));
					})
				})
			})
			$scope.displayedList = $scope.tagSearchMapUserResults;
		})
	}

	$scope.searchUserByName = function() {
		var userList = $firebaseArray(ref.child("users"));
		$scope.searchText = ($scope.searchText).toLowerCase();

		$scope.userSearchResults = {};
		$scope.displayedList = {};

		userList.$loaded().then(function() {
			angular.forEach(userList, function(user) {
				var fullName = user.firstName + " " + user.lastName;
				fullName = fullName.toLowerCase();
				if (fullName.indexOf($scope.searchText) !== -1) {
					$scope.userSearchResults[user.$id] = $firebaseObject(ref.child("users").child(user.$id));
				}
			})
		})
		$scope.displayedList = $scope.userSearchResults;
	}

});
