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
    this.cancelBooking = (booking_id) => {
     const defer = $q.defer()
     $http({
       method:'delete',
       url:'/user_rooms/cancel/' + booking_id
     }).then(response => {
       console.log(response.data)
       defer.resolve(response.data)
     })
     return defer.promise
    }
    this.getBookingsFromDBforTrips = (user_id) => {
      console.log(user_id);
      const defer = $q.defer();
      $http({
        method:'get',
        url:'/user_rooms/user_trips/' + user_id
      }).then(response => {
        console.log(response.data);
        defer.resolve(response.data)
      })
      return defer.promise
    }

    this.deleteTripFromDB = (res_id) => {
      console.log(res_id);
      const defer = $q.defer()
      $http({
        method:'delete',
        url:'/user_rooms/user_trips/'+res_id
      }).then(response => {
        console.log(response);
        defer.resolve(response.data)
      })
      return defer.promise
    }
})
