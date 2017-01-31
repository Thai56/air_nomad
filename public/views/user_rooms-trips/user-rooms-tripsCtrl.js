angular.module('myApp').controller('userRoomsTripsCtrl', ($scope,loginService,userRoomsReservationsService) => {
  loginService.getUser().then(user => {
    if(user){
      console.log(user);
      $scope.user = user
      userRoomsReservationsService.getBookingsFromDBforTrips($scope.user.id)
        .then(response => {
          console.log(response);
          $scope.bookings = response;
        })
    }
    else {
      $scope.user = 'USER NOT FOUND'
    }
  })

  $scope.deleteTripFromDB = (res_id) => {
    console.log(res_id);
    userRoomsReservationsService.deleteTripFromDB(res_id).then(response => {
      $scope.bookings = response;
    })
  }
})
