IIITK_ERP.service('UserService',['$http', '$q','UIUtilityService', function ($http, $q, UIUtilityService) {

    return {

        login: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};

            var url = UIUtilityService.getURL('authenticate').login;
            $http({method: 'POST', url: url, data: parameters}).then(function (data) {
                data = data.data;
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);

            }, function(result) {
                //some error
                deferredData.success = false;
                deferred.resolve(deferredData);
            });
            return deferred.promise;
        },


        register: function (parameters) {
            var deferred = $q.defer();
            var deferredData = {};
            console.log(parameters);

            var url = UIUtilityService.getURL('authenticate').register;
            $http({method: 'POST', url: url, data: parameters}).then(function (data) {
                data = data.data;
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);

            }, function(result) {
                //some error
                deferredData.success = false;
                deferred.resolve(deferredData);
            });
            return deferred.promise;
        },

        getLoggedInUser:function(parameters){
            var deferred = $q.defer();
            var deferredData = {};
            var url = UIUtilityService.getURL('authenticate').getLoggedInUser;

            $http({method: 'GET', url: url}).then(function (data) {
                data = data.data;
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data[0];
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);

            }, function(result) {
                //some error
                deferredData.success = false;
                deferred.resolve(deferredData);
            });
            return deferred.promise;
        },
			getUserFullDetail:function(parameters){
				var deferred = $q.defer();
				var deferredData = {};
				console.log(parameters);

				var url = UIUtilityService.getURL('authenticate').getProfile;
				$http({method: 'POST', url: url, data: parameters}).then(function (data) {
					data = data.data;
					if (data.success == 'false' || !data.success) {
						deferredData.success = false;
					} else {
						deferredData.success = true;
						deferredData.data = data.data;
					}
					deferredData.message = data.message;
					deferred.resolve(deferredData);

				}, function(result) {
					//some error
					deferredData.success = false;
					deferred.resolve(deferredData);
				});
				return deferred.promise;
      },
        forgotPassword:function(parameters){
            var deferred = $q.defer();
            var deferredData = {};
            console.log(parameters);

            var url = UIUtilityService.getURL('authenticate').forgotPassword;
            $http({method: 'POST', url: url, data: parameters}).then(function (data) {
                data = data.data;
                if (data.success == 'false' || !data.success) {
                    deferredData.success = false;
                } else {
                    deferredData.success = true;
                    deferredData.data = data.data;
                }
                deferredData.message = data.message;
                deferred.resolve(deferredData);

            }, function(result) {
                //some error
                deferredData.success = false;
                deferred.resolve(deferredData);
            });
            return deferred.promise;
        },
    }



}]);