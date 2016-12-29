angular.module('myApp').controller('roomListingMainDescCtrl', ($scope,$stateParams,roomListingMainDescService) => {
  const room_id = $stateParams.room_id;

  roomListingMainDescService.getRoomListingMainDesc(room_id)
  .then((response) => {
    console.log('working from controller descripition service', response)
    $scope.desc = response[0];
    console.log('this is descriptions',$scope.desc);
  })



})
