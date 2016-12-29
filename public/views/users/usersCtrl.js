angular.module('myApp').controller('usersCtrl', ($scope,$stateParams,usersService) => {
  $scope.message = usersService.getMessage() + 'and this is the $stateParams/Users.Id ' + $stateParams.id;
  console.log('this is $state params',$stateParams.id);
})
