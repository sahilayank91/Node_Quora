IIITK_ERP.service('PostsService', ['$http', '$q', 'UIUtilityService', 'Upload', function ($http, $q, UIUtilityService, Upload) {
    'use strict';

    return {

        getPost: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').getPost;

            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                console.log(data);
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                }
                deferredData.data = data.data;
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },
        createPost: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').createPost;

            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },
        deletePost: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').deletePost;

            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },
        postComment: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').postComment;

            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },

        getDashboardPosts: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').dashboardPosts;

            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },

        addLike: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').addLike;

            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },

        disLike: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').disLike;

            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },

        followUser: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').followUser;

            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },

        unfollowUser: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').unfollowUser;

            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },
        upVoteAnswer: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').upVoteAnswer;
            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },
        downVoteAnswer: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').downVoteAnswer;
            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },

        savePost: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').savePost;
            $http({method: 'POST', url: url, data: parameters}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },


        uploadFile: function (file) {
            var url = UIUtilityService.getURL('posts').uploadFiles;

            return Upload.upload({
                url: url,
                file: file,
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'}, // only for html5
                fileName: file.name
            });
        },

    };
}])
;
