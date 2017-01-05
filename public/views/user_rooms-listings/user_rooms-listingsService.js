angular.module('myApp').service('userRoomsListingsService', function($http,$q,$state){
  this.getListingsForView = (user_id) => {
    console.log(user_id);
    const defer = $q.defer()
    $http({
      method:'get',
      url:'/user_rooms/user_listings' + '?user_id=' + user_id
    })
    .then(response => {
      console.log(response.data);
      defer.resolve(response.data)
    })
    .catch(err => {
      state.go('err')
    })
    return defer.promise
  }
})
