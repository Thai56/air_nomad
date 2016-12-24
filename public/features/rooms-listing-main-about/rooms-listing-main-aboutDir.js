angular.module('myApp').directive('roomListingMainAbout', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/rooms-listing-main-about/rooms-listing-main-about.html',
    controller:'roomsListingMainAboutCtrl'
  }
})
