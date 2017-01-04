angular.module('myApp').controller('userRoomsListingsCtrl', ($scope,$stateParams,$rootScope,userRoomsListingsService)=> {
  const check = $stateParams.viewParam;
  console.log(check);
})
