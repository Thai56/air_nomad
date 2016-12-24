angular.module('myApp').service('roomsListingCarouselService', function($http,$q) {
  this.getCarouselImages = (room_id) => {
    const defer = $q.defer();
    console.log('room_id from service on way out',room_id);
    $http({
      method:'get',
      url:'/rooms/carousel/' + room_id
    }).then(response => {
        console.log('resoinse from serviceCarouselImage',response);
        defer.resolve(response.data)
    })
    return defer.promise
  }
})
