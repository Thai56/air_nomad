angular.module('myApp').controller('roomListingMainDescCtrl', ($scope,$stateParams,roomListingMainDescService) => {
  const room_id = $stateParams.room_id;

  roomListingMainDescService.getRoomListingMainDesc(room_id)
  .then((response) => {
    console.log('working from controller descripition service', response)
    $scope.descriptions = response;
    console.log('this is descriptions',$scope.descriptions);
  })



})
