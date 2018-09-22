IIITK_ERP.service('HomeService', ['$http', '$q', 'UIUtilityService', function ($http, $q, UIUtilityService) {
'use strict';


return {

    getEventList:function(){
        var deferred = $q.defer();
        var deferredData = {};
        var url = UIUtilityService.getURL('event').getEvent;
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
    getNews: function () {
        var deferred = $q.defer();
        var deferredData = {};
        var url = UIUtilityService.getURL('news').getNews;
        $http({method: 'POST', url: url}).then(function (data) {
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
