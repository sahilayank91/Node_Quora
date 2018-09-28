ASK_BIN.controller('CreatePostController', ['$scope','$rootScope','UserService','$window','UIUtilityService','DataFactory','PostsService','Upload', function ($scope,$rootScope,UserService,$window,UIUtilityService,DataFactory,PostsService,Upload) {
    $scope.userProfile = JSON.parse(DataFactory.getResult('userdata'));

    console.log($scope.userProfile);






    $scope.getPosts = function(){





    };


    let vm = this;
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            console.log(vm.file);
            vm.upload(vm.file); //call upload function
        }
    };

    vm.upload = function (file) {
        Upload.upload({
            url: '/service/file/uploadFile', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise

            console.log(resp);
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                $scope.uploadedFile  = resp.data.filename;
                $scope.createPost();
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




    $scope.createPost = function(){
        var parameters = {
            posted_by:$scope.userProfile._id,
            content :{
                text:$scope.text,
                file:$scope.uploadedFile,
            },
            type:$scope.type
        };

        PostsService.createPost(parameters)
            .then(function(data){
                if(data){
                    console.log(data);
                }
            })


    }


}]);
