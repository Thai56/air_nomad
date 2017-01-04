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

  this.reserveDate = (room_id,start,end) => {
    console.log('======> start =====> service',start);
    const defer = $q.defer();
    $http({
      method:'post',
      url:'/rooms/reservations',
      data: {
        room_id:room_id,
        start:start,
        end:end
      }
    }).then(response => {
      console.log('!!!response back in service',response.data);
      defer.resolve(response.data)
    })
    .catch(err => {
      alert('please log in or click to sign up ')
      console.log('ERROR LOGGING IN!', err);
    })
    return defer.promise
  }

})
