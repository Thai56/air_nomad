angular.module('myApp').service('roomsListingMainBookingService', function($http,$q){
  this.getRoomListingNightlyPrice = (room_id) => {
    const defer = $q.defer()
    $http({
      method:'get',
      url:'/rooms/nightly_price/' + room_id
    }).then(response => {
      console.log('this is response in service Booking', response);
      defer.resolve(response.data)
    })
    return defer.promise
  }
})
