angular.module('main').controller('SettingsController', function($rootScope, $scope, $state, $firebaseAuth, $firebaseArray, $firebaseObject, $stateParams) {
	if ($stateParams.userId === null) {
		$scope.isRedirect = false;
		$scope.userId = null;
	} else {
		$scope.isRedirect = true;
		$scope.userId = $stateParams.userId;
	}
	// App header variables
	$scope.heading = "VIEW YOUR PROFILE";
	$scope.subheading = "You. Are. Awesome.";
	$scope.headingImage = "../../assets/img/profile.jpg";

	$scope.editing = false;
	$scope.editMessage = "Edit Profile";
	$scope.editingSkills = false;
	$scope.editingProjects = false;

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
			if ($scope.userId === null) {
				$scope.userId = user.uid;
			}
			var userData = $firebaseObject(ref.child("users").child($scope.userId));
			userData.$loaded().then(function() {
				console.log(userData);
				userData.$bindTo($scope, "currentUser");
			})
		} else {
			console.log("error, who are you?");
		}
	})

	$scope.goToSearch = function() {
		$state.go("search");
	}

	$scope.signOut = function() {
		$scope.authObj.$signOut();
		$state.go('login');
	}

	$scope.editPressed = function(){
		if($scope.editing){
			$scope.editMessage = "Edit Profile";
		}
		else{
			$scope.editMessage = "Done Editing";
			$('.chips-placeholder').material_chip({
    			placeholder: 'Enter a tag',
    			secondaryPlaceholder: '+Skill',
  			});
			//updateDatabase();
		}

		$scope.editing = !($scope.editing);
	}

	$scope.addSkill = function(skill){
		$scope.currentUser.skills.push(skill);
	}

	$scope.removeSkill = function(skill){
		var index = $scope.currentUser.skills.indexOf(skill);
		if(index > -1){
			$scope.currentUser.skills.splice(index, 1)
		}
	}

	$scope.addproject = function(){
		$scope.currentUser.projects.push($scope.selectedProject);
	}

	$scope.removeProject = function(project){
		var index = $scope.currentUser.projects.indexOf(project);
		if(index > -1){
			$scope.currentUser.projects.splice(index, 1)
		}
	}

  	$('.chips').material_chip();
  	$('.chips-placeholder').material_chip({
    	placeholder: 'Enter a tag',
    	secondaryPlaceholder: '+Skill',
  	});


   	$('.chips').on('chip.add', function(e, chip){
    	$scope.addSkill(chip.tag);
  	});

  	$('.chips').on('chip.delete', function(e, chip){
  });

});
