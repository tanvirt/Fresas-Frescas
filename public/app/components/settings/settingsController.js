angular.module('main').controller('SettingsController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $firebaseObject) {
	
	// App header variables
	$scope.heading = "Settings";
	$scope.subheading = "Our berries will change your life.";
	$scope.headingImage = "../../assets/img/tinted_settings.jpg";

	//temp variables for editing profile info
	// $scope.editPositon;
	// $scope.editSummary;
	// $scope.editProjects;
	// $scope.editExperience;
	// $scope.editSkills;

	$scope.editing = false;
	$scope.editMessage = "Edit Profile";

	$scope.authObj = $firebaseAuth();
	$scope.user = null;
	$scope.profileObject = null;
	$scope.profileData = null;
	$rootScope.addListener(new function() {
		this.onUserAuth = function(user) {
			$scope.user = $scope.authObj.$getAuth();

			var ref = firebase.database().ref().child("users");
			var profileRef = ref.child($scope.user.uid);
			
			$scope.profileObject = $firebaseObject(profileRef);

			$scope.profileObject.$bindTo($scope, "profileData").then(function() {
				// Access user data here for the specified user doing $scope.data.<whatever>
			}).catch(function(error) {
				console.error("error:", error);
			});
			
		};


	});

	$scope.delete = function() {
		$scope.message = null;
		$scope.error = null;

		var firebaseUser = $scope.authObj.$getAuth();
		var profileRef = firebase.database().ref().child("users").child(firebaseUser.uid);
		var profileObject = $firebaseObject(profileRef);

		profileObject.$remove().then(function(ref) {
			//Deleted
		}), function(error) {
			console.log("Error:", error);
		};

		$scope.authObj.$deleteUser().then(function() {
			console.log($scope.data);
			$scope.message = "User deleted";
		}).catch(function(error) {
				$scope.error = error;
		});
	};

	// $scope.saveInfo = function(position, summary, projects, experience, skills){
	// 	$scope.currentUser.position = position;
	// 	$scope.currentUser.summary = summary;
	// 	$scope.currentUser.projects = projects;
	// 	$scope.currentUser.experience = experience;
	// 	$scope.currentUser.skills = skills;
	// }

	$scope.editPressed = function(){

		if($scope.editing){
			$scope.editMessage = "Edit Profile";
		}
		else{
			$scope.editMessage = "Done Editing";
		}

		$scope.editing = !($scope.editing);

	}

	$scope.currentUser = {
		name: "Sam Wildman",
		position: "Associate - Applications Developer",
		summary: "All berries matter",
		projects: ["Business Center", "Creating the freshest strawberries"],
		experience: ["loves berries"],
		skills: ["awesome"],
		image: "../../assets/img/choco.jpg"
	}

});
