var mainApp = angular.module("mainApp", ['ngRoute']);
         mainApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider
              .when('/home', {
                 templateUrl: 'home.htm'
              })

              .when('/garden', {
                 templateUrl: 'garden.htm'
              })

              .otherwise({
                 redirectTo: '/home'
              });
           }]);
