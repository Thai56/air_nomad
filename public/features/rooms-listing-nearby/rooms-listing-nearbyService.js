angular.module('myApp').service('roomsListingNearbyService', function($http,$q){
  this.getRoomThisLocationInfo = (room_id) => {
    const defer = $q.defer()
    $http({
      method:'get',
      url:'/rooms/listings/current_location/' + room_id
    }).then(response => {
      defer.resolve(response.data)
    })
    return defer.promise
  }
  this.getRoomsNearby = (room_id,city_name) => {
    const defer = $q.defer()
    $http({
      method:'get',
      url:'/rooms/listings/nearby/' + room_id + '/' + city_name
    })
    .then(response => {
      console.log('response back from getRoomsNearyby Service function',response.data);
      defer.resolve(response.data)
    })
    return defer.promise
  }
})
