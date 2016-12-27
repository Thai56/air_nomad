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

  this.bookNow = (val) => {
    const defer = $q.defer();
    $http({
      method:'post',
      url:'http://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=DR8573HW7W9FC'
    })
    return defer.promsie
  }
})
