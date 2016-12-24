angular.module('myApp').directive('roomListingMainDesc', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/room-listing-main-desc/room-listing-main-desc.html',
    controller:'roomListingMainDescCtrl'
  }
})
