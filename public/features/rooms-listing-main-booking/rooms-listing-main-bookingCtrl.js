angular.module('myApp').controller('roomsListingMainBookingCtrl', ($scope, $stateParams,$rootScope,$filter, roomsListingMainBookingService, loginService) => {
    const room_id = $stateParams.room_id;
    $scope.message = roomsListingMainBookingService.getRoomListingNightlyPrice(room_id).then(response => {
        console.log('this is the price', response);
        $scope.price = response[0]
    })
    loginService.getUser().then(user => {
        console.log('ths us firing');
        if (user) {
            $scope.user = user
            console.log(user);
        } else {
            $scope.user = 'User not logged in'
        }
    })

    $scope.reserveDate = (start, end) => {
        if (!start || !end) {
            alert('please pick a valid date')
        } else {
            $scope.chosenStartDate = $filter('date')(start, 'shortDate')
            $scope.chosenEndDate = $filter('date')(end, 'shortDate')
        }
        let startDate = $filter('date')(start, 'd')
        let endDate = $filter('date')(end, 'd')
        console.log(startDate, endDate);
        $scope.total_price = (endDate - startDate) * $scope.price.nightly_price
        console.log($scope.total_price)
        console.log($scope.total_price);
        roomsListingMainBookingService.reserveDate(room_id, $scope.chosenStartDate, $scope.chosenEndDate, $scope.total_price).then(response => {
            console.log('response back into the controller on the way back ====> ', response);
            $rootScope.all_bookings_for_User = response;
            // console.log(`Your reservation has been booked from  ${response.start} to ${response.end} for ${response.length}`);
            $scope.startDate.value =''
            $scope.endDate.value = ''
        })
    }

        $scope.goToPaypal = (a,b,c) => {
          console.log(a);
          console.log(b);
          console.log(c);
          // alert('this is working paypal function')
        }
    // =====================================================================================================================


    $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

    $rootScope.$watch('all_bookings_for_User', (newVal,oldVal) => {
      $rootScope.bookings_length = $rootScope.all_bookings_for_User.length;
      // console.log($rootScope.bookings_length);
    })
    $scope.$watch('startDate.value', (newVal, oldVal) => {
        newVal.setDate(newVal.getDate())
        $scope.changedDate = $filter('date')(newVal, 'yyyy-MM-dd')
        console.log($scope.changedDate);
    })
    $scope.$watch('user', (newVal,oldVal) => {
      $scope.user_changed = newVal;
    })


})
