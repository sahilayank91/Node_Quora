IIITK_ERP.service('RegistrationService', ['$http', '$q', 'UIUtilityService', function ($http, $q, UIUtilityService) {
	'use strict';


	return {

		registerStudent:function(parameters){
			var deferred = $q.defer();
			var deferredData = {};
			var url = UIUtilityService.getURL('registration').registerStudent;
			$http({method: 'POST', url: url,data:parameters}).success(function (data, status, headers, config) {
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
		getRegisteredStudent: function () {
			var deferred = $q.defer();
			var deferredData = {};
			var url = UIUtilityService.getURL('registration').getRegisteredStudent;
			$http({method: 'GET', url: url}).then(function (data) {
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
