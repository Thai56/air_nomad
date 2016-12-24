angular.module('myApp').directive('roomListingCarousel', function() {
  //  //  //
  //  THIS ROOM LISTINGCAROUSEL IS MISSING AN S AT THE END OF 'ROOM'
  //  //  //
  return {
    restrict:'AE',
    templateUrl:'./features/rooms-listing-carousel/rooms-listing-carousel.html',
    controller:'roomsListingCarouselCtrl'
  }
})
