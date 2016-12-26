angular.module('myApp').service('roomsListingProfilePicService', function($http,$q) {
  const message = 'This is the profile pic placeholder'
  this.getMessage = () => {
    return message;
  }
  this.getRoomListingProfilePic = (room_id) => {
    const defer = $q.defer();
    $http({
      method:'get',
      url:'/rooms/profile-pic/' + room_id
    }).then(response => {
      console.log('this is the response from the profile pic service',response);
      defer.resolve(response.data)
    })
    return defer.promise
  }
})
