IIITK_ERP.controller('ProfileController', ['$scope','$rootScope','ProfileService','$window','UIUtilityService','DataFactory','Upload','PostsService', function ($scope,$rootScope,ProfileService,$window,UIUtilityService,DataFactory,Upload,PostsService) {
	$scope.userProfile = JSON.parse(DataFactory.getResult('userdata'));
	// $scope.userProfile = $scope.userProfile[0];
    $scope.expertise = "";
    $scope.askedQuestions = [];
    $scope.suggestedEdits = [];
    $scope.getProfile = function(id){
		let parameters = {
			_id: id
		};
		ProfileService.getProfile(parameters)
			.then(function(data){

				if(data)
				{
						$scope.user = data.data[0];
						console.log($scope.user);
                        DataFactory.setResult('userdata',JSON.stringify($scope.user));
                        $scope.userProfile = $scope.user;
				}
				else{
				}
			}).catch(function(error){
			console.log(error);
		});
	};

    $scope.getProfile($scope.userProfile._id);

	$scope.getAskedQuestions = function(){
            if($scope.userProfile){
                let parameters = {
                    _id:$scope.userProfile._id
                };

                PostsService.getPost(parameters)
                    .then(function(data){
                        if(data){
                            console.log("dfdfa",data);
                          $scope.askedQuestions = data.data;
                        }

                    })
            }

	};

	$scope.getSavedPosts = function(){
	    $scope.savedPosts = [];
	  if($scope.userProfile){
	      for(let i=0;i<$scope.userProfile.savedPost.length;i++){
              let parameters = {
                  _id:$scope.userProfile.savedPost[i]
              };

              PostsService.getSavedPost(parameters)
                  .then(function(data){
                      console.log("fsdfsafs",data);
                      if(data.data.length>0){
                          $scope.savedPosts.push(data.data[0]);
                      }

                  }).then(function(){
                      console.log("Saved Posts:" ,  $scope.savedPosts);
              })
          }
      }
    };

    $scope.getSuggestedEdits = function(){

        $scope.suggestedEdits= [];
        var parameter  = {
          user:$scope.userProfile._id
      };
      PostsService.getSuggestedEdits(parameter)
          .then(function(data){
                       if(data.data.length>0){
                           console.log(data);
                           $scope.suggestedEdits = data.data;

                       }

          }).catch(function(err){
              console.log(err);
      })
    };


    $scope.getReportedPost = function(){

        $scope.reportedPost= [];
        let parameter  = {
            actiontaken:false
        };
        PostsService.getReportedPost(parameter)
            .then(function(data){
                if(data.data.length>0){
                    console.log("reported:",data);
                    $scope.reportedPost = data.data;
                }
            }).catch(function(err){
            console.log(err);
        })
    };

    $scope.deletePost = function(item){
        var parameter = {
          _id:item.post._id
        };
      PostsService.deletePost(parameter)
          .then(function(data){
              if(data){
                  console.log("post deleted",data);
                  $scope.clearPost(item._id);
                  window.alert("The post is deleted");
              }
          })
    };



    $scope.clearPost = function(post){
        console.log("postfsfsafs:",post);

        var parameter = {
            _id:post
        };
        PostsService.clearPost(parameter)
            .then(function(data){
                if(data){
                    console.log("post cleared",data);
                    $scope.getReportedPost();
                }
            })
    };




    $scope.updateProfile = function(){
		var parameters = {
			_id:$scope._id,
			email:$scope.email,
			firstname:$scope.firstname,
			lastname:$scope.lastname,
            expertise:$scope.expertise,
			name:$scope.firstname + ' '+ $scope.middlename + ' ' +$scope.lastname,
			phone:$scope.phone,
			mothername:$scope.mothername,
			permanent_address:$scope.permanent_address,
			occupation:$scope.occupation,

		};
		if($scope.profilePic){
		    parameters.profilePic = $scope.profilePic;
        }
		var interest=[];
		if($scope.Education){
		    interest.push('Education');
        }
        if($scope.Technology){
            interest.push('Technology');
        }
        if($scope.Politics){
            interest.push('Politics');
        }
        if($scope.Civics){
            interest.push('Civics');
        }
        if($scope.Websites){
            interest.push('Websites');
        }
        if($scope.Android){
            interest.push('Android');
        }
        parameters.interest = interest;


        console.log(parameters);
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
    let vm = this;
	$scope.openUpdateProfileModal = function(){
		$scope._id = $scope.user._id;
		$scope.firstname = $scope.user.firstname;
		$scope.lastname = $scope.user.lastname;
		$scope.phone = $scope.user.phone;
		$scope.email = $scope.user.email;
		$scope.permanent_address = $scope.user.permanent_address;
		$scope.file = "/uploads/" + $scope.userProfile.profilePic;
		$scope.occupation = $scope.userProfile.occupation;
		$scope.expertise = $scope.userProfile.expertise;
		$("#myModal").modal();
	};


    vm.submit = function(){ //function to call on form submit
         if (vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
         }else{
         	$scope.updateProfile();
		 }
    };

    vm.upload = function (file) {
        Upload.upload({
            url: '/service/file/uploadProfilePic', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise

            console.log(resp);
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                $scope.profilePic = resp.data.filename;
                $scope.updateProfile();
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

    $scope.openChangePasswordModal = function(){
            $("#passwordmodal").modal('show');
    };

    $scope.changePassword = function(){
        $("#passwordmodal").modal('hide');


        var parameters = {
            _id:$scope.userProfile._id,
            currentpass:$scope.currentpass,
            newpass:$scope.newpass,
            confirmpass:$scope.confirmpass
        };


        ProfileService.changePassword(parameters)
            .then(function(data){
                if(data){
                    console.log("Password Changed");
                }
            })

    };
    $scope.getAskedQuestions();
    $scope.getSavedPosts();
    $scope.getSuggestedEdits();
    $scope.getReportedPost();
}]);
