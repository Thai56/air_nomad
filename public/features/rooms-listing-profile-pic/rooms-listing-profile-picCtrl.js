angular.module('myApp').controller('roomsListingProfilePicCtrl', ($scope,$stateParams,roomsListingProfilePicService) => {
  const room_id = $stateParams.room_id;
  roomsListingProfilePicService.getRoomListingProfilePic(room_id).then(response => {
    console.log('response from profile pic ctrl on way back',response)
    $scope.profilePic = response;
    console.log('$scope.profiePIc',$scope.profilePic);
  })
})
