angular.module('myApp').directive('roomListingMainBooking', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/rooms-listing-main-booking/rooms-listing-main-booking.html',
    controller:'roomsListingMainBookingCtrl'
  }
})
