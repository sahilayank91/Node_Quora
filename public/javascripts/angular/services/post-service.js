IIITK_ERP.service('PostsService', ['$http', '$q', 'UIUtilityService', 'Upload', function ($http, $q, UIUtilityService, Upload) {
    'use strict';

    return {
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
            var url = UIUtilityService.getURL('posts').dashboardPosts + "?q=1";
            if (parameters.lastPostId) {
                url += '&lastPostId=' + parameters.lastPostId;
            }
            // Get posts of child only when it is passed, else get all dashboard posts of user
            if (parameters.childId) {
                url += "&id=" + parameters.childId;
            }

            $http({method: 'GET', url: url}).success(function (data, status, headers, config) {
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.response = data.data;
                }
                deferred.resolve(deferredData);
            })
                .error(function (data, status, headers, config) {
                    deferredData.success = false;
                    deferred.resolve(deferredData);
                });
            return deferred.promise;
        },

        getComments: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('posts').getComments + '?postId=' + parameters.postId;

            if (parameters.lastCommentId) {
                url += '&lastId=' + parameters.lastCommentId;
            }

            $http({method: 'GET', url: url}).success(function (data, status, headers, config) {
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
