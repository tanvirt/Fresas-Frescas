angular.module('main').controller('SettingsController', function($rootScope, $scope, $firebaseAuth, $firebaseArray, $firebaseObject) {

	// App header variables
	$scope.heading = "Settings";
	$scope.subheading = "Our berries will change your life.";
	$scope.headingImage = "../../assets/img/tinted_settings.jpg";

	$scope.editing = false;
	$scope.editMessage = "Edit Profile";
	$scope.editingSkills = false;
	$scope.selectedSkill;
	$scope.editingProjects = false;
	$scope.selectedProject;

	$scope.authObj = $firebaseAuth();
	$scope.user = null;
	$scope.profileObject = null;
	$scope.profileData = null;
	$scope.currentUser = {};

	var ref = firebase.database().ref();
	//all projects in database -- for typeahead
	var existingProjects = $firebaseObject(ref.child("projects"));


	$scope.authObj.$onAuthStateChanged(function(user) {
		if(user) {
			var userId = user.uid;
			var userData = $firebaseObject(ref.child("users").child(userId));
			userData.$loaded().then(function() {
				console.log(userData);
				userData.$bindTo($scope, "currentUser");
			})
		} else {
			console.log("error, who are you?");
		}
	})

	/*$scope.delete = function() {
		$scope.message = null;
		$scope.error = null;

		var firebaseUser = $scope.authObj.$getAuth();
		var profileRef = firebase.database().ref().child("users").child(firebaseUser.uid);
		var profileObject = $firebaseObject(profileRef);

		profileObject.$remove().then(function(ref) {
			//Deleted
		}), function(error) {
			console.log("Error:", error);
		};*

		$scope.authObj.$deleteUser().then(function() {
			console.log($scope.data);
			$scope.message = "User deleted";
		}).catch(function(error) {
				$scope.error = error;
		});
	};*/


	$scope.editPressed = function(){
		if($scope.editing){
			$scope.editMessage = "Edit Profile";
		}
		else{
			$scope.editMessage = "Done Editing";
			//updateDatabase();
		}

		$scope.editing = !($scope.editing);
	}

	$scope.addSkill = function(){
		$scope.currentUser.skills.push($scope.selectedSkill);
		$scope.selectedSkill = undefined;
	}

	$scope.removeSkill = function(skill){
		var index = $scope.currentUser.skills.indexOf(skill);
		if(index > -1){
			$scope.currentUser.skills.splice(index, 1)
		}
	}

	$scope.addproject = function(){
		$scope.currentUser.projects.push($scope.selectedProject);
		$scope.selectedProject = undefined;
	}

	$scope.removeProject = function(project){
		var index = $scope.currentUser.projects.indexOf(project);
		if(index > -1){
			$scope.currentUser.projects.splice(index, 1)
		}
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

	$('.chips').material_chip();
  	$('.chips-initial').material_chip({
    data: [{
      tag: 'Apple',
    }, {
      tag: 'Microsoft',
    }, {
      tag: 'Google',
    }],
  });
  $('.chips-placeholder').material_chip({
    placeholder: 'Enter a tag',
    secondaryPlaceholder: '+Skill',
  });

});
