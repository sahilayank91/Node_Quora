IIITK_ERP.controller('ProfileController', ['$scope','$rootScope','ProfileService','$window','UIUtilityService','DataFactory', function ($scope,$rootScope,ProfileService,$window,UIUtilityService,DataFactory) {
	$scope.userProfile = JSON.parse(DataFactory.getResult('userdata'));

	$scope.getProfile = function(id){
		var parameters = {
			_id: id
		};
		ProfileService.getProfile(parameters)
			.then(function(data){

				if(data)
				{
						$scope.user = data.data[0];
				}
				else{
				}
			}).catch(function(error){
			console.log(error);
		});
	};


	$scope.getProfile($scope.userProfile._id);

	$scope.updateProfile = function(){
		var parameters = {
			_id:$scope._id,
			email:$scope.email,
			firstname:$scope.firstname,
			middlename:$scope.middlename,
			lastname:$scope.lastname,
			fathername:$scope.fathername,
			name:$scope.firstname + ' '+ $scope.middlename + ' ' +$scope.lastname,
			phone:$scope.phone,
			mothername:$scope.mothername,
			permanent_address:$scope.permanent_address
		};

		ProfileService.updateProfile(parameters)
			.then(function(data){
				if(data){
					console.log(data);
					$scope.getProfile($scope.user._id);
				}else{
					UIUtilityService.NOTIFICATION.show({
						title: "Failed",
						content: "Error in Updating Profile. Please Try Again",
						type: "error"
					});


				}
			}).catch(function(err){


		})
	};

	$scope.openUpdateProfileModal = function(){
		$scope._id = $scope.user._id;
		$scope.firstname = $scope.user.firstname;
		$scope.middlename = $scope.user.middlename;
		$scope.lastname = $scope.user.lastname;
		$scope.branch = $scope.user.branch;
		$scope.phone = $scope.user.phone;
		$scope.email = $scope.user.email;
		$scope.category = $scope.user.category;
		$scope.mothername = $scope.user.mothername;
		$scope.fathername = $scope.user.fathername;
		$scope.permanent_address = $scope.user.permanent_address;

		$("#myModal").modal();
	}

	let vm = this;
	vm.submit = function(){ //function to call on form submit
		if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
			vm.upload(vm.file); //call upload function
		}
	};

	vm.upload = function (file) {
		Upload.upload({
			url: '/service/file/updateProfilePic', //webAPI exposed to upload the file
			data:{file:file} //pass file as data, should be user ng-model
		}).then(function (resp) { //upload function returns a promise

			console.log(resp);
			if(resp.data.error_code === 0){ //validate success
				$window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
				$scope.user.profilePic = resp.data.filename;
				$scope.registerStudent();
			} else {
				$window.alert('an error occured');
			}
		}, function (resp) { //catch error
			console.log('Error st' +
				'status: ' + resp.status);
			$window.alert('Error status: ' + resp.status);
		}, function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
		});
	};



}]);
