IIITK_ERP.controller('HomeController', ['$scope','UserService','$rootScope','$window','UIUtilityService','DataFactory','HomeService', function ($scope,UserService,$rootScope,$window,UIUtilityService,DataFactory,HomeService) {
    $scope.userProfile = JSON.parse(DataFactory.getResult('userdata'));

    console.log($scope.userProfile);



    



}]);
