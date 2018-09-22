IIITK_ERP.controller('UserController', ['$scope','$rootScope','UserService','$window','UIUtilityService','DataFactory', function ($scope,$rootScope,UserService,$window,UIUtilityService,DataFactory) {
     $scope.userProfile = JSON.parse(DataFactory.getResult('userdata'));

    $scope.confirm_password = "";
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
          role:$scope.role,
        };

        UserService.register(parameters)
            .then(function(data){
                if(data){
                    console.log("Successfully registered the user",data);
                    $scope.userProfile = data.data;
                    DataFactory.setResult('userdata',JSON.stringify($scope.userProfile));
                    $scope.$broadcast('updateProfileData');
                }
            }).catch(function(err){
                console.log("Error occured while registering the user: ",err);
        });
    }


}]);
