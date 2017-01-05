angular.module('myApp').service('usersEditProfileService', function($http,$q) {
  this.saveChanges = (userObj) => {
    console.log(userObj);
    const defer = $q.defer();
    $http({
      method:'post',
      url:'/users/profile/edit',
      data:userObj
    })
    .then(response => {
      console.log(response.data);
      defer.resolve(response.data)
    })
    .catch(err => {
      alert(err.data)
    })
    return defer.promise
  }
})
