angular.module('myApp').service('loginService',function($http,$q,$state){
  this.loginUser = function(credentials) {
    return $http({
      method: "POST",
      url: '/login',
      data: credentials
    })
    .then(function(res) {
      console.log('this is the res from loginUserService',res);
      // if( typeof res.data.redirect =='string'){
      //   console.log('res.data.redirect',res.data.redirect);
      //   // $state.go(res.data.redirect)
      // }
      return res.data;
    })
    .catch(function(err) {
      alert('please log in or click to sign up ')
      console.log('ERROR LOGGING IN!', err);
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

  this.checkForToken = function(token) {
      if (token) {
        console.log('checkForToken',token);
        sessionStorage.setItem('myToken', token)
      }
    }
})
