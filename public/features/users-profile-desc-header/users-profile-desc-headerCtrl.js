angular.module('myApp').controller('usersProfileDescHeaderCtrl', ($scope,$stateParams,usersProfileDescHeaderService) => {
  const user_id = $stateParams.id;
  usersProfileDescHeaderService.getHostDesc(user_id).then(response => {
    $scope.hostDesc = response[0];
    console.log($scope.hostDesc);
  })
})
