angular.module('myApp').controller('roomsListingMainBookingCtrl', ($scope,$stateParams,$filter,roomsListingMainBookingService) => {
  const room_id = $stateParams.room_id;
  $scope.message = roomsListingMainBookingService.getRoomListingNightlyPrice(room_id).then(response => {
    console.log('this is the price',response);
    $scope.price = response[0]
  })
  $scope.reserveDate = (start,end) => {
    if(!start || !end){
      alert('please pick a valid date')
    }
    else {
      $scope.chosenStartDate = $filter('date')(start, 'shortDate')
      console.log('=================== this is the value from $scope.chosenStartDate' , $scope.chosenStartDate)
      $scope.chosenEndDate = $filter('date')(end,'shortDate')
      console.log('=================== this is the value from $scope.chosenEndDate' , $scope.chosenEndDate)
      roomsListingMainBookingService.reserveDate(room_id,$scope.chosenStartDate,$scope.chosenEndDate).then(response =>{
        console.log('response back into the controller on the way back ====> ', response);
        alert(response);
      })
    }
  }


})
