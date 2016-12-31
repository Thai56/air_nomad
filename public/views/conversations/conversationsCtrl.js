angular.module('myApp').controller('conversationsCtrl', ($scope,$stateParams,conversationsService) => {
  $scope.message = conversationsService.getMessage()
})
