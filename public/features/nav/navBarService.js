angular.module('myApp').service('navBarService', function($http,$q,$state,$rootScope) {
  this.logout = () => {
    console.log('fireing');
    return $http({
      method: 'GET',
      url: '/logout'
    })
    .then(function(res) {
      console.log(res.data);
      $rootScope.itemsInCart = 0;
      $state.go(res.data.redirect)
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
