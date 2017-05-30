/*
  * The purpose of this page is to initialize the Angular app
  * and provide routing for the View
  * @author Kevin Hardy-Cooper
  * @date May 28 2017
  * @frameworks AngularJS
*/
var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
       templateUrl: 'home.htm'
    })
    .otherwise({
       redirectTo: '/home'
    });
 }]);
