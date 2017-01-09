angular.module('myApp').service('roomsListingMainBookingService', function($http, $q) {

    this.getRoomListingNightlyPrice = (room_id) => {
        const defer = $q.defer()
        $http({
            method: 'get',
            url: '/rooms/nightly_price/' + room_id
        }).then(response => {
            console.log('this is response in service Booking', response);
            defer.resolve(response.data)
        })
        return defer.promise
    }

    this.reserveDate = (room_id, start, end, price) => {
        console.log('======> start =====> service', start);
        const defer = $q.defer();
        $http({
                method: 'post',
                url: '/rooms/reservations',
                data: {
                    room_id: room_id,
                    start: start,
                    end: end,
                    price: price
                }
            }).then(response => {
                console.log('!!!response back in service', response.data);
                defer.resolve(response.data)
            })
            .catch(err => {
                alert('please log in or click to sign up ')
                console.log('ERROR LOGGING IN!', err);
            })
        return defer.promise
    }

    
    // this.goToPaypal = (userObj, priceObj, total_price) => {
    //   console.log('GO TO PAY PAL',userObj,priceObj,total_price);
    //  return $http({
    //         method: 'post',
    //         url: 'http://www.sandbox.paypal.com/cgi-bin/webscr',
    //         headers: {
    //           'Access-Control-Allow-Origin':'Post',
    //           'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         data: {
    //             cmd: "x_click",
    //             item_name: priceObj.listing_name,
    //             item_number: priceObj.room_id,
    //             business: userObj.email,
    //             quantity: 1,
    //             currency_code: "USD",
    //             first_name: userObj.first_name,
    //             last_name: userObj.last_name,
    //             amount: total_price
    //         }
    //     })
    // }

})
// ACCESS-control-request-method:'POST',
// ORIGIN: null,
// USER-AGESNT
// 'Accept': 'application/json;odata=verbose',
// cliend_id:"AaTzJbBVMSmv7RFC6vDWukKGZGhgav45D9ylFD6RJCEv_90d4XsXwtAXzVGxa_vcaB7iZV82vmyDP9iU",
// secret:"F_1ja7096TF7vtP4bXKQNDL0qXLbYDi_h3vVE4kjRgfVbQ7lOb69VoI1mqnlULgQT"
