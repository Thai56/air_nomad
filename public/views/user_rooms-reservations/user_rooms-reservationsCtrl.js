angular.module('myApp').controller('userRoomsReservationsCtrl', ($scope,$rootScope,userRoomsReservationsService,loginService) => {
  $scope.userNow = false;
  // get all the sessions with this user id
loginService.getUser().then(function(user){
  if(user){
    $scope.user= user
    console.log($scope.user);

      userRoomsReservationsService.getUserBookingsById(user.id).then(response => {
        $scope.userBookings = response;
        $scope.userNow = true;
        var myArray = []
      //   $scope.userBookings.forEach(book => {
      //     myArray.push(book.room_id * 1)
      //   })
      //   userRoomsReservationsService.getRoomInfoByIdForReservations(myArray)
      //   // get host_name host_image location_image room_id listing name
      })

  }
  else { $scope.user = "could not find USER"}
})

$scope.cancelBooking = (booking_id) => {
  console.log(booking_id);
  userRoomsReservationsService.cancelBooking(booking_id).then(response => {
    console.log(response);
    $scope.userBookings = response;
    $rootScope.itemsInCart = $scope.userBookings.length;
  })
}
// $scope.$watch('userBookings',(newVal,oldVal)=> {
//   $scope.userBookings = newVal
// })

})
