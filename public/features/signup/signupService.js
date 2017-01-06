angular.module('myApp').service('signupService',function($http,$q){
  this.registerUser = function(user) {
    let defer = $q.defer();
    $http({
      method:'POST',
      url:'/users/edit',
      data:user
    }).then(function(response){
      console.log(response)
      defer.resolve(response.data)
    }).catch(function(err){
      alert(err.data)
    })
    return defer.promise
  }
})
