/*
  * The purpose of this file is contain the Controller in the
  * MVC architecture of AngularJS
  * @author Kevin Hardy-Cooper
  * @date May 28 2017
  * @frameworks AngularJS
*/
mainApp.controller("pocketController", function($scope) {
  $scope.pocketSalad = "PocketSalad",
  $scope.typedStrings = [
    "Want salad?^1000",
    "Get that green thumb into action!^1000",
    "Find places near you that sell vegetable seeds, with PocketSalad."
  ]
});
