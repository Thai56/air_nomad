angular.module('myApp').controller('roomsListingMainBookingCtrl', ($scope, $stateParams, $rootScope, $filter, roomsListingMainBookingService, loginService) => {
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
            let userBookingsArray = [];
            $rootScope.all_bookings_for_User = response;
            response.forEach(book => {
                console.log(book);
                if (book.buyer_id === $scope.user.id) {
                  userBookingsArray.push(book)
                  console.log(userBookingsArray);
                }

            })
            console.log(userBookingsArray)
            let latestBooking = userBookingsArray[userBookingsArray.length - 1]
            alert(`YOUR RESERVATION HAS BEEN BOOKED FOR ${$scope.price.listing_name} for the date of ${latestBooking.start} and ${latestBooking.end}`)

            // console.log(userBookingsArray)
            alert(`You will now be directed to checkout ${$scope.user.first_name}`)
            $scope.startDate.value = ''
            $scope.endDate.value = ''
        })

    }



    $scope.goToPaypal = (userObj, priceObj, total_price) => {
            console.log(userObj);
            console.log(priceObj);
            console.log(total_price);
            roomsListingMainBookingService.goToPaypal(userObj, priceObj, total_price)
            alert('this is working paypal function')
        }
        // =====================================================================================================================


    $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

    $scope.$watch('startDate.value', (newVal, oldVal) => {
            newVal.setDate(newVal.getDate())
            $scope.changedDate = $filter('date')(newVal, 'yyyy-MM-dd')
            console.log($scope.changedDate);
        })
        //dummy demo
        //     $scope.foo = 'foo';
        // $scope.bar = 'bar';

    $scope.$watchGroup(['user', 'all_bookings_for_User'], function(newValues, oldValues, scope) {
        // newValues array contains the current values of the watch expressions
        $scope.newUser = newValues[0];
        $scope.all_bookings_for_User = newValues[1]
        console.log('This is new value [1]', newValues[1]);
        // with the indexes matching those of the watchExpression array
        // i.e.
        // newValues[0] -> $scope.foo
        // and
        // newValues[1] -> $scope.bar
    });




})
