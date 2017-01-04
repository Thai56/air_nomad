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
      $scope.chosenEndDate = $filter('date')(end,'shortDate')
      if($scope.chosenStartDate >= $scope.chosenEndDate){
        alert('They are the same day')
      }
      roomsListingMainBookingService.reserveDate(room_id,$scope.chosenStartDate,$scope.chosenEndDate).then(response =>{
        console.log('response back into the controller on the way back ====> ', response);
        alert(response);
      })
    }
  }
// =====================================================================================================================



  // $scope.minDate = $filter('date')(new Date(), 'yyyy-MM-dd')
  //
  //
  //   var date = new Date();
  //   date.setDate(date.getDate() + 1)
  //   $scope.maxDate =  $filter('date')(date, 'yyyy-MM-dd')
  //
  // console.log($scope.minDate);
  // $scope.$watch('minDate', () => {
  //   if($scope.minDate > $filter('date')(date, 'yyyy-MM-dd')){
  //     date.setDate(date.getDate() + 1)
  //     $scope.maxDate = $filter('date')(date, 'yyyy-MM-dd')
  //     console.log($scope.maxDate);
  //   }
  // })

  $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

  $scope.$watch('startDate.value', (newVal,oldVal)=> {
    newVal.setDate(newVal.getDate()+1)
    $scope.changedDate = $filter('date')(newVal, 'yyyy-MM-dd')
    console.log($scope.changedDate);
  })
})
