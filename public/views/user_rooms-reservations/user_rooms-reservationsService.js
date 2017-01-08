angular.module('myApp').service('userRoomsReservationsService', function($http,$q) {
    this.getUserBookingsById = (id) => {
      console.log(id);
      const defer = $q.defer()
      $http({
        method:'get',
        url:'/user_rooms/bookings/' + id
      }).then(response => {
        console.log(response.data);
        if(response.data.length > 0){
          defer.resolve(response.data)
        }
        else {
          alert('You have No bookings! Use Search Bar to Find Your Desired Location!')
        }
      })
      return defer.promise
    }
    this.getRoomInfoByIdForReservations = (arr) => {
      const defer = $q.defer()
      console.log(arr);
      $http({
        method:'get',
        url:'/user_rooms/reservations/rooms?rooms='+arr
      }).then(response => {
        console.log(response.data);
      })
      return defer.promise;

    }
})
