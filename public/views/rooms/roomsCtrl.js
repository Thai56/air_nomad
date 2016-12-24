angular.module('myApp').controller('roomsCtrl', ($scope,$stateParams) => {
  $scope.message = 'welcoming to the room view';
  console.log('log $stateParams',$stateParams);
})
