ASK_BIN.controller('RegistrationController', ['$scope','$rootScope','UserService','$window','UIUtilityService','DataFactory','RegistrationService','Upload', function ($scope,$rootScope,UserService,$window,UIUtilityService,DataFactory,RegistrationService,Upload) {
    $scope.userProfile = JSON.parse(DataFactory.getResult('userdata'));
    $scope.user = {};

    console.log($scope.userProfile);
		$scope.registrationStart = false;
    $scope.step1_enable=true;
    $scope.step2_enable = false;
    $scope.step3_enable = false;
    $scope.step4_enable = false;
    $scope.step5_enable = false;
    $scope.error = {};
    $scope.confirmDetails = false;
    $scope.completionForm = false;
		$scope.error.exists = false;
		$scope.registrationDetailsComplete = true;
	function setError ( content) {
		$scope.error.exists = true;
		$scope.error.content = content;
		return false;
	}

	function clearError (type) {
		$scope.error.exists = false;
	}

	$scope.validateParameters = function(step){
				if(step==="step1"){
					if($scope.user.firstname ===undefined  || $scope.user.lastname ===undefined || $scope.user.middlename ===undefined  || $scope.user.branch ===undefined ||
						$scope.user.category ===undefined){
							return setError("Please fill all the fields");
					}
					if($scope.user.phone.length<10 || $scope.user.phone.length>12){
						return setError("Phone Number not correct");
					}
				}else if(step==="step2"){
						if($scope.user.fathername ===undefined || $scope.user.mothername ===undefined || $scope.user.parent_email ===undefined){
							return setError("Please fill all the fields")
						}
					if($scope.father_mobileno.length<10 || $scope.father_mobileno.length>12){
						return setError("Father phone Number not correct");
					}
					if($scope.mother_mobileno.length<10 || $scope.mother_mobileno.length>12){
						return setError("Mother's phone Number not correct");
					}
				}else if(step==="step3"){
					if($scope.user.hosteller ===undefined || $scope.permanent_address ===undefined || $scope.local_address ===undefined){
						return setError("Please fill all the fields");
					}
				}else if(step==="step4"){
					if($scope.user.guardian_email===undefined || $scope.user.guardian_address===undefined || $scope.user.guardian_name ===undefined){
						return setError("Please fill all the fields");
					}
					if($scope.guardian_phone.length<10 || $scope.guardian_phone.length>12){
						return setError("Phone Number not correct");
					}

				}

				return true;


    };
    $scope.move_to_previous_step = function(){
    	if($scope.step2_enable===true){
    		$scope.step1_enable = true;
    		$scope.step2_enable = false;
			}else if($scope.step3_enable===true){
    		$scope.step3_enable= false;
    		$scope.step2_enable = true;
			}else if($scope.step4_enable === true){
    		$scope.step4_enable = false;
    		$scope.step3_enable = true;
			}else if($scope.step5_enable === true){
    		$scope.step5_enable = false;
    		$scope.step4_enable = true;
			}
		}
    $scope.step_one_Registration = function(){


            /*First step registration information */
            $scope.user.firstname = $scope.firstname;
            $scope.user.lastname = $scope.lastname;
            $scope.user.middlename = $scope.middlename;
            $scope.user.name = $scope.firstname + " " + $scope.middlename + " " +  $scope.lastname;
            $scope.user.branch = $scope.branch;
            $scope.user.category = $scope.category;
            $scope.user.phone = $scope.mobileno;
            $scope.user.dob = $scope.dob;
            $scope.user.email = $scope.email;
            $scope.user.gender = $scope.gender;


					if($scope.validateParameters("step1")){
						clearError();
						$scope.step1_enable = false;
						$scope.step2_enable = true;
					}else return false;



    };

    $scope.step_two_Registration = function(){
					$scope.step2_enable = false;
					$scope.step3_enable = true;
					$scope.user.fathername = $scope.fathername;
					$scope.user.mothername = $scope.mothername;
					$scope.user.father_mobileno = $scope.father_mobileno;
					$scope.user.mother_mobileno = $scope.mother_mobileno;
					$scope.user.parent_email = $scope.parent_email;

			if($scope.validateParameters("step2")){
				clearError();
				$scope.step2_enable = false;
				$scope.step3_enable = true;
			}else return false;

		};


    $scope.step_three_Registration= function(){
    	$scope.step3_enable = false;
    	$scope.step4_enable = true;
    	$scope.user.permanent_address = $scope.permanent_address;
    	$scope.user.hosteller = $scope.hosteller;
    	$scope.user.local_address = $scope.local_address;

			if($scope.validateParameters("step3")){
				clearError();
				$scope.step3_enable = false;
				$scope.step4_enable = true;
			}else return false;
    };


    $scope.step_four_Registration = function(){
					$scope.step4_enable = false;
					$scope.step5_enable = true;
					$scope.user.guardian_name = $scope.guardian_name;
					$scope.user.guardian_phone = $scope.guardian_phone;
					$scope.user.guardian_email = $scope.guardian_email;
					$scope.user.guardian_address = $scope.guardian_address;
					$scope.user.role = "Student";

					let date  = new Date();
					$scope.user.year = date.getFullYear();
					$scope.user.created_by = $scope.userProfile._id;
					// $scope.registerStudent();


			if($scope.validateParameters("step4")){
				clearError();
				$scope.step4_enable = false;
				$scope.step5_enable = true;
			}else return false;
		};


	$scope.showDetails= function(){
		$scope.step5_enable = false;
		$scope.completionForm = true;
	};


		let vm = this;
		vm.submit = function(){ //function to call on form submit
			if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
				vm.upload(vm.file); //call upload function
			}
		};

	vm.upload = function (file) {
		Upload.upload({
			url: '/service/file/uploadStudentProfilePic', //webAPI exposed to upload the file
			data:{file:file} //pass file as data, should be user ng-model
		}).then(function (resp) { //upload function returns a promise

			console.log(resp);
			if(resp.data.error_code === 0){ //validate success
				$window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
				$scope.user.profilePic = resp.data.filename;
				$scope.showDetails();



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


    $scope.registerStudent = function() {
			if ($scope.confirmDetails) {
				RegistrationService.registerStudent($scope.user).then(function(data) {
					if (data) {
						console.log("Registration successful",data);
						$scope.studentid = data.data.studentid;
					}
				}).catch(function(err) {
					console.log("Error in registering the student: ", err);
				})
			}else{
				$window.alert('Please accept the confirmation');
			}
		}

		$scope.printDetails = function(printSectionId){

				var innerContents = document.getElementById(printSectionId).innerHTML;
				console.log(innerContents);
				var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
				popupWinindow.document.open();
				popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
				popupWinindow.document.close();


		}










}]);
