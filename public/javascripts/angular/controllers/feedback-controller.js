IIITK_ERP.controller('FeedbackController', ['$scope','UserService','DataFactory', function ($scope,UserService,DataFactory) {
    $scope.userProfile = JSON.parse(DataFactory.getResult('userdata'));


    $scope.validateParameters = function(){

		};





    $scope.submitFeedback = function(){

		};





}]);
