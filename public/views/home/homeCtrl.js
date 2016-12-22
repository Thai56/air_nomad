angular.module('myApp').controller('homeCtrl', function($scope, homeService) {
  $scope.newmessage = 'Welcome to the Home page'
  var foo ='bar'
  $scope.message = homeService.getMessage()


})
