angular.module('myApp').service('roomListingMainPicService', function ($http,$q) {
  this.getRoomListingMainPic = (room_id) => {
    const defer = $q.defer();
    $http({
      method:'GET',
      url:'/rooms/img/'+ room_id
    }).then(response => {
      console.log('response from the roomlistingsmainpicservice',response);
      defer.resolve(response.data)
    })
    return defer.promise
  }
})
