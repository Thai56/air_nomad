angular.module('myApp').directive('homeRoomListings',function() {
  return {
    restrict:'AE',
    controller:'homeRoomListingsCtrl',
    templateUrl:'./features/home-room-listings/home-room-listings.html'
  }
})
