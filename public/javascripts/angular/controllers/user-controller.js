IIITK_ERP.controller('UserController', ['$scope','$rootScope','UserService','$window','UIUtilityService','DataFactory', function ($scope,$rootScope,UserService,$window,UIUtilityService,DataFactory) {
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
    $scope.getFollowing();
    $scope.getFollower();


}]);
