angular.module('myApp').service('roomListingMainDescService', function($http,$q) {
  this.getRoomListingMainDesc = (room_id) => {
    const defer = $q.defer();
    $http({
      method:'GET',
      url:'/rooms/desc/'+ room_id
    }).then(function(response) {
      console.log('response from service description', response);
      defer.resolve(response.data)
    })
    return defer.promise;
  }
})
