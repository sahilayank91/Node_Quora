IIITK_ERP.factory('IIITKInterceptor', ['$window', function ($window) {
    return {
        response: function (response) {
            if (response.data && response.data.redirect) {
                $window.location = response.data.redirect;
            }
            return response;
        }
    };
}]);
