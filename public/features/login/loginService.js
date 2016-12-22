angular.module('myApp').service('loginService',function($http,$q){
  this.loginUser = function(credentials){
    const defer = $q.defer();
    $http({
      method:'post',
      url:'/users/auth/local',
      data:credentials
    }).then(response => {
      console.log(response.data)
      defer.resolve(response)
    })
    return defer.promise
  }
})
