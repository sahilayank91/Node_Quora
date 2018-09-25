IIITK_ERP.controller('UserController', ['$scope','$rootScope','UserService','$window','UIUtilityService','DataFactory','PostsService', function ($scope,$rootScope,UserService,$window,UIUtilityService,DataFactory,PostsService) {
    $scope.userProfile = JSON.parse(DataFactory.getResult('userdata'));
    console.log($scope.userProfile);
    $scope.confirm_password = "";
    $scope.follower = [];
    $scope.following = [];
    function validateParameters(type){
        if(type=='login'){
            if($scope.email==="" || $scope.password===" "){
                return false;
            }
            return true;
        }else if(type=='register'){
            if($scope.password === $scope.confirm_password){
                return true;
            }
        }
    }

    $scope.getUserDetails = function(){

        var parameters = {
            _id:$scope.userProfile._id
        };

        UserService.getUserFullDetail(parameters)
            .then(function(data){
                if(data){
                    console.log(data);
                    $scope.userProfile = data.data[0];
                    console.log("your user profile is shown as:");
                    console.log($scope.userProfile);
                    DataFactory.setResult('userdata',JSON.stringify($scope.userProfile));

                    //Initiating the trigger to all the pages for updating the userdata
                    $rootScope.$broadcast('updateProfileData');
                }
            }).then(function(data){
            $scope.getFollower();
            $scope.getFollowing();
        })
    };


    $scope.login = function(){
        if(!validateParameters('login')){
                return;
        }
        var parameters = {
            password:$scope.password,
            email:$scope.email
        };

       UserService.login(parameters)
            .then(function(data){
              if(data){
                  $scope.userProfile = data.data[0];
                  console.log("your user profile is shown as:");
                  console.log($scope.userProfile);
                  DataFactory.setResult('userdata',JSON.stringify($scope.userProfile));
                  
                  //Initiating the trigger to all the pages for updating the userdata
                  $rootScope.$broadcast('updateProfileData');
              }
            });
    }



    $scope.register = function(){
        var parameters = {
          email:$scope.email,
          password:$scope.password,
          firstname:$scope.firstname,
          lastname:$scope.lastname,
        };

        UserService.register(parameters)
            .then(function(data){
                if(data){
                    console.log("Successfully registered the user",data);
                    $scope.$broadcast('updateProfileData');
                }
            }).catch(function(err){
                console.log("Error occured while registering the user: ",err);
        });
    };

    $scope.getFollowing = function(){
        $scope.following=[];
        if($scope.userProfile){
        for(let i=0;i<$scope.userProfile.following.length;i++){
            let parameters = {
                _id:$scope.userProfile.following[i]
            };
            UserService.getUserFullDetail(parameters)
                .then(function(data){
                   $scope.following.push(data.data[0]);
                }).then(function(){
                    console.log($scope.following);
            })
        }
    }

    };


    $scope.getFollower = function(){
        $scope.follower=[];
        if($scope.userProfile){
            for(let i=0;i<$scope.userProfile.follower.length;i++){
                let parameters = {
                    _id:$scope.userProfile.follower[i]
                };
                UserService.getUserFullDetail(parameters)
                    .then(function(data){
                        $scope.follower.push(data.data[0]);
                    }).then(function(){
                    console.log($scope.follower);
                })
            }
        }

    };

    $scope.followUser = function(userId){
        var parameter = {
            userId:$scope.userProfile._id,
            id:userId
        };

        PostsService.followUser(parameter)
            .then(function(data){
                console.log(data);
               if(data){
                   $scope.getUserDetails();

               }


            })
    };

    $scope.unfollowUser = function(userId){
        var parameter = {
            userId:$scope.userProfile._id,
            id:userId
        };

        PostsService.unfollowUser(parameter)
            .then(function(data){
                if(data){
                    $scope.getUserDetails();

                }

            })
    };


    $scope.verifyEmail = function(){
        var parameter = {
            email:$scope.email
        }

        UserService.forgotPassword(parameter)
            .then(function(data){

            })



    };

    $scope.getFollowing();
    $scope.getFollower();


}]);
