angular.module('myApp').controller('roomsListingMainCtrl', ($scope, $stateParams,roomListingMainPicService) => {
  $scope.message = 'Hello IM A PICTURE!';
  console.log('$stateparams.room_id from rooms-listing main pic controller',$stateParams.room_id);
  const room_id = $stateParams.room_id;
  roomListingMainPicService.getRoomListingMainPic(room_id).then((response) => {
    console.log('response that was handed back from the service here in controller',response);
    $scope.roomListingMainPic = response
    console.log('last one',$scope.roomListingMainPic);
  });
})
