angular.module('myApp').directive('roomListingMainPic', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/rooms-listing-main-pic/room-listing-main-pic.html',
    controller:'roomsListingMainCtrl'
  }
})
