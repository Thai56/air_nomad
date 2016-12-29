angular.module('myApp').service('usersProfilePicService', function($http,$q){
  this.getUsersProfilePic = (user_id) => {
    const defer = $q.defer();
    $http({
      method:'get',
      url:'/users/profile-pic/' + user_id
    }).then(response => {
      console.log(response.data);
      defer.resolve(response.data);
    })
    return defer.promise
  }

})
