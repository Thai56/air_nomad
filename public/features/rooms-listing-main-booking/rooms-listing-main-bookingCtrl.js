angular.module('myApp').controller('roomsListingMainBookingCtrl', ($scope,$stateParams,roomsListingMainBookingService) => {
  const room_id = $stateParams.room_id;
  $scope.message = roomsListingMainBookingService.getRoomListingNightlyPrice(room_id).then(response => {
    console.log('this is the price',response);
    $scope.price = response[0]
  })
  $scope.bookNow = (val) => {
    console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\',val)
    roomsListingMainBookingService.bookNow(val)
  }
})
