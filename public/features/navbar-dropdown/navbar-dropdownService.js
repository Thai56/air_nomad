angular.module('myApp').service('navbarDropdownService', function($http,$q) {
  this.getUser = function() {
    return $http({
      method: 'GET',
      url: '/auth/me'
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    })
  }
  this.getUserById = (user_id) => {
    const defer = $q.defer()
    $http({
      method:'get',
      url:'/users/' + user_id
    })
    return defer.promise
  }
})
