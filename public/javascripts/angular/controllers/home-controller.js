ASK_BIN.controller('HomeController', ['$scope','UserService','$rootScope','$window','UIUtilityService','DataFactory','HomeService','PostsService','Upload','ProfileService', function ($scope,UserService,$rootScope,$window,UIUtilityService,DataFactory,HomeService,PostsService,Upload,ProfileService) {
    $scope.userProfile = JSON.parse(DataFactory.getResult('userdata'));
     // $scope.userProfile = $scope.userProfile[0];
    console.log($scope.userProfile);
    $scope.dashboardPosts = [];
    $scope.questionList = [];
    $scope.notification = [];
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
            });
    };

    $scope.getDashboardPosts = function(){
        $scope.dashboardPosts = [];
        for(var i=0;i<$scope.userProfile.interest.length;i++){
            var parameter = {
              type:$scope.userProfile.interest[i]
            };
            PostsService.getDashboardPosts(parameter)
                .then(function(data){
                    if(data){
                        for(let j=0;j<data.data.length;j++){
                            $scope.dashboardPosts.push(data.data[j]);
                            $scope.questionList.push(data.data[j].content.text);
                        }
                        console.log($scope.dashboardPosts);
                    }
                })
        }
    };


    $scope.showActivationModal = function(){
        $("#activationmodal").modal('show');
    };
    $scope.activateProfile = function(){
        var parameters = {
            _id:$scope.userProfile._id,
            activated:true
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
        ProfileService.activateAccount(parameters)
            .then(function(data){
                if(data){
                    console.log(data);
                    $scope.getUserDetails();
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

    $scope.userProfile.activated===false ? $scope.showActivationModal() : true;



    $scope.cname = function(string) {

        $scope.hidethis = false;

        var output = [];

        angular.forEach($scope.questionList, function(country) {

            if (country.toLowerCase().indexOf(string.toLowerCase()) >= 0) {

                output.push(country);

            }

        });

        $scope.filterCountry = output;

        console.log($scope.filterCountry);

    };

    $scope.fillInputBox = function(string) {

        $scope.country = string;

        $scope.hidethis = true;

    };


    $scope.addComment = function(post){
        var parameter = {
            text:post.newComment,
            user:$scope.userProfile._id,
            post:post._id,
            occupation:$scope.userProfile.occupation,
            profilePic:$scope.userProfile.profilePic,
            firstname:$scope.userProfile.firstname,
            lastname:$scope.userProfile.lastname,
            uploadedFile:$scope.uploadedFile
        };
        console.log(parameter);
        PostsService.postComment(parameter)
            .then(function(data){
                if(data){
                    $scope.getDashboardPosts();
                    $scope.uploadedFile = "";
                    // console.log("Comment posted");
                }
            })

    };

    $scope.addLike = function(post){

        var parameter = {
            id:post._id
        };

        PostsService.addLike(parameter)
            .then(function(data){
                if(data){
                    $scope.getDashboardPosts();

                }
            }).catch(function(err){
                console.log(err);
        })
    };
    $scope.disLike = function(post){
        var parameter = {
            id:post._id
        };

        PostsService.disLike(parameter)
            .then(function(data){
                if(data){
                    $scope.getDashboardPosts();

                }
            }).catch(function(err){
            console.log(err);
        })
    };

    $scope.followUser = function(userId){
        var parameter = {
            userId:$scope.userProfile._id,
            id:userId
        };

        PostsService.followUser(parameter)
            .then(function(data){
                console.log(data);
                $scope.getUserDetails();
                $scope.getDashboardPosts();
            })
    };

    $scope.unfollowUser = function(userId){
        var parameter = {
            userId:$scope.userProfile._id,
            id:userId
        };

        PostsService.unfollowUser(parameter)
            .then(function(data){
                $scope.getUserDetails();
                $scope.getDashboardPosts();
            })
    };


    $scope.upVoteAnswer  = function(commentId, postId){
        var parameter = {
            commentId:commentId,
            postId:postId
        };
        console.log(parameter);

        PostsService.upVoteAnswer(parameter)
            .then(function(data){
                if(data){
                    console.log(data);
                    $scope.getDashboardPosts();
                }

            }).catch(function(err){
                console.log(err);
        })

    };

    $scope.downVoteAnswer = function(commentId, postId){
        var parameter = {
            commentId:commentId,
            postId:postId
        };

        PostsService.downVoteAnswer(parameter)
            .then(function(data){
                if(data){
                    console.log(data);

                }

            }).catch(function(err){
            console.log(err);
        })
    };


    $scope.savePost = function(post){
       var parameter = {
           _id:$scope.userProfile._id,
            postId:post._id
       };
       console.log(parameter);

       PostsService.savePost(parameter)
           .then(function(data){

               if(data){
                   console.log(data);
               }

           });
    };

    $scope.suggestEdit = function(commentId, postId,poster,question,comment){
        $scope.question = question;
        $scope.comment = comment;
        $scope.commentId = commentId;
        $scope.postId = postId;
        $scope.user = poster;

        $("#modal-default").modal('show');


    };
    $scope.saveEdits = function(){

        $("#modal-default").modal('hide');

            var parameter = {
                posted_by:$scope.userProfile._id,
                user:$scope.user,
                post:$scope.postId,
                text:$scope.edit,
                answer_posted:$scope.comment
            };


            PostsService.suggestEdit(parameter)
                .then(function(data){
                    if(data){
                        console.log(data);
                    }
                })
    };


    let vm = this;
    $scope.submit = function(file){ //function to call on form submit

        console.log("insde submit");
        if (file) { //check if from is valid
            console.log(file);
            $scope.upload(file); //call upload function
        }
    };

    $scope.upload = function (file) {
        Upload.upload({
            url: '/service/file/uploadFile', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise

            console.log(resp);
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                $scope.uploadedFile  = resp.data.filename;
                // console.log($scope.uploadedFile);
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

    $scope.removeUploadedFile = function(){
        $scope.uploadedFile = "";
    };

    $scope.openReportPostModal = function(post){
        $scope.question = post.content.text;
        $scope.postId = post._id;
        $scope.posted = post.posted_by._id;

        $("#reportPostModal").modal('show');


    };

    $scope.reportPost = function(post){
        $("#reportPostModal").modal('hide');

        let parameter = {
            reportedBy:$scope.userProfile._id,
            post:$scope.postId,
            reason:$scope.edit,
            postedBy:$scope.posted
        };

        PostsService.reportPost(parameter)
            .then(function(data){
                if(data){
                    console.log("Post Reported");
                    $scope.edit = "";
                }
            })
    };

    $scope.getNotification = function(){
        let parameter = {
            _id:$scope.userProfile._id
        };
            UserService.getNotification(parameter)
                .then(function(data){
                    if(data){
                        $scope.notification = data.data;
                        console.log("Array: ",$scope.notification);
                    }
                })
    };
    $scope.getNotification();
    $scope.getDashboardPosts();


}]);
