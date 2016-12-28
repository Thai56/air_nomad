angular.module('myApp').service('roomsListingMapService', function($http,$q){
  this.getRoomListingCoordinates = (room_id) => {
    const defer = $q.defer();
    $http({
      method:'get',
      url:'/rooms/locations/' + room_id
    }).then(response => {
      console.log('======MAP SERVICE response', response.data);
      defer.resolve(response.data)
    })
    return defer.promise
  }
})
