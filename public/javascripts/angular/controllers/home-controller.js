IIITK_ERP.controller('HomeController', ['$scope','UserService','$rootScope','$window','UIUtilityService','DataFactory','HomeService','PostsService', function ($scope,UserService,$rootScope,$window,UIUtilityService,DataFactory,HomeService,PostsService) {
    $scope.userProfile = JSON.parse(DataFactory.getResult('userdata'));
     // $scope.userProfile = $scope.userProfile[0];
    console.log($scope.userProfile);
    $scope.dashboardPosts = [];


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
                        }
                        console.log($scope.dashboardPosts);
                    }
                })



        }

    };

    $scope.addComment = function(post){
        var parameter = {
            text:post.newComment,
            user:$scope.userProfile._id,
            post:post._id,
            occupation:$scope.userProfile.occupation,
            profilePic:$scope.userProfile.profilePic,
            firstname:$scope.userProfile.firstname,
            lastname:$scope.userProfile.lastname
        };
        console.log(parameter);
        PostsService.postComment(parameter)
            .then(function(data){
                if(data){
                    $scope.getDashboardPosts();
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
       }



    };



    $scope.getDashboardPosts();


}]);
