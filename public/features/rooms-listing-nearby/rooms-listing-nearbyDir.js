angular.module('myApp').directive('roomListingNearby', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/rooms-listing-nearby/rooms-listing-nearby.html',
    controller:'roomsListingNearbyCtrl'
  }
})
