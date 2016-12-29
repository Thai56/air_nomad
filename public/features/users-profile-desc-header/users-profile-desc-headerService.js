angular.module('myApp').service('usersProfileDescHeaderService', function($http,$q){
  this.getHostDesc = (user_id) => {
    const defer = $q.defer()
    $http({
      method:'get',
      url:'/users/desc-header/' + user_id
    }).then(response => {
      defer.resolve(response.data)
    })
    return defer.promise
  }
})
