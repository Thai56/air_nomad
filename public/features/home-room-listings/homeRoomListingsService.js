angular.module('myApp').service('homeRoomListingsService', function($http,$q){
  this.getListingsForHome = () => {
    const defer = $q.defer();
    $http({
      method:'get',
      url:'/rooms/listings',
    }).then(response => {
      console.log('response from homeRoomListingsService',response);
      defer.resolve(response.data);
    })
    return defer.promise

  }
})
