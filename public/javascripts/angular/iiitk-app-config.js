ASK_BIN.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('IIITKInterceptor');
    
    // For any unmatched url, redirect to /index
    $urlRouterProvider.otherwise("/index");
    $urlRouterProvider.when("/", "/index");

    // Now set up the states
    $stateProvider
        .state('index', {
            url: "/index",
            templateUrl: "index",
            controller: "IndexController"
        })
        .state('login', {
            url: "/login",
            templateUrl: "profile",
            controller: "UserController"
        })
        .state('aboutus',{
            url:"/aboutus",
            templateUrl:"partials/aboutus",
            controller: "IndexController"

        })
}]);
