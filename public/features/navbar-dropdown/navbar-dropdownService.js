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
    console.log('firing from getUSERBYID in navbarDropdownService');
    $http({
      method:'get',
      url:'/users/' + user_id
    }).then(response => {
      console.log('this is response.data from navbarDropdownService',response.data);
      defer.resolve(response.data)
    })
    return defer.promise
  }

  this.logout = () => {
    console.log('fireing');
    return $http({
      method: 'GET',
      url: '/logout'
    })
    .then(function(res) {
      console.log(res.data);
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    })
  }
})
