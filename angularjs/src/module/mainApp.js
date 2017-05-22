var mainApp = angular.module("mainApp", ['ngRoute']);
         mainApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.

            when('/home', {
               templateUrl: 'home.htm',
               controller: 'pocketController'
            }).

            when('/seaBeans', {
               templateUrl: 'seaBeans.htm',
               controller: 'seaBeansController'
            }).

            otherwise({
               redirectTo: '/home'
            });
         }]);
