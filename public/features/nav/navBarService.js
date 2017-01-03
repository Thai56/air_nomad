angular.module('myApp').service('navBarService', function($http,$q) {
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
})
