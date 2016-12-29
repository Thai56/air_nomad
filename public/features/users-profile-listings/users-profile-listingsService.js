angular.module('myApp').service('userProfileListingsService', function($http,$q) {
  this.getHostListings = (room_id) => {
    const defer = $q.defer()
    $http({
      method:'get',
      url:'/users/listings/' + room_id
    }).then(response => {
      console.log('this is the response in service getHostListings', response.data);
      res.resolve(response.data)
    })
    return defer.promise
  }
})
