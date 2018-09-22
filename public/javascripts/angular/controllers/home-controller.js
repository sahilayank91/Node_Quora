IIITK_ERP.controller('HomeController', ['$scope','UserService','$rootScope','$window','UIUtilityService','DataFactory','HomeService', function ($scope,UserService,$rootScope,$window,UIUtilityService,DataFactory,HomeService) {
    $scope.userProfile = JSON.parse(DataFactory.getResult('userdata'));
    console.log($scope.userProfile);


    $scope.eventList = [];
    $scope.getEventList = function(){

        HomeService.getEventList()
            .then(function(data){
                if(data.length > 0) {
                    for (var i = 0; i < data.data.length; i++) {
                        var parameters = {};
                        parameters.title = data.data[i].title;
                        parameters.description = data.data[i].description;
                        parameters.date = data.data[i].date;
                        parameters.organizer = data.data[i].organizer;
                        parameters._id = data.data[i]._id;
                        parameters.type = data.data[i].type;
                        parameters.eventPhoto = "/uploads/" + data.data[i].eventPhoto;
                        $scope.eventList.push(parameters);
                    }
                    let x = $scope.eventList;
                    $scope.eventList = x.reverse();
                }
            }).catch(function(error){
                console.log("Error in getting the event list: ",error);
        })
    };



    $scope.getNews = function(){
        HomeService.getNews()
            .then(function(data){
                if(data.length > 0){
                    for(let i=0;i<data.length;i++){
                        var parameters = {};
                    }
                }
            })
    };



    $scope.displayUserProfile = function(){





    };


    



}]);
