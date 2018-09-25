ASK_BIN.service('ProfileService',['$http', '$q','UIUtilityService', function ($http, $q, UIUtilityService) {

	return {

		getProfile: function (parameters) {
			var deferred = $q.defer();
			var deferredData = {};
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

		updateProfile: function (parameters) {
			var deferred = $q.defer();
			var deferredData = {};

			var url = UIUtilityService.getURL('authenticate').updateProfile;
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
		}

	}

}]);