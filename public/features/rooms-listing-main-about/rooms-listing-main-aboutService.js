angular.module('myApp').service('roomsListingMainAboutService', function($http,$q) {
  this.getRoomListingMainAccessories = (room_id) => {
    const defer = $q.defer();
    $http({
      method:'GET',
      url:'/rooms/about/' + room_id,
    }).then(response => {
      console.log('this is response from service on way bak',response);
      defer.resolve(response.data)
    })
    return defer.promise;
  }
})
