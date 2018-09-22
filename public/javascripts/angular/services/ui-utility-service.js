IIITK_ERP.service('UIUtilityService', ['$window', function ($window) {
    'use strict';
    
    return {
        getURL: function (key) {
            return $window.CONFIG[key + 'URL'];
        },
        getUserData: function () {
            return $window.userdata;
        },
        setUserData: function (userdata) {
            $window.userdata = userdata;
            console.log("User data in : ",window.userdata);

        },
        NOTIFICATION: $window.UTILITIES.NOTIFICATIONS,

    };
}]);
