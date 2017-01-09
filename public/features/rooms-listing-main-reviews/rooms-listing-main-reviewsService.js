angular.module('myApp').service('roomsListingMainReviewsService', function($http,$q) {
  this.getReviews = (room_id) => {
      const defer = $q.defer();
      $http({
        method:'get',
        url:'/rooms/reviews/' + room_id
      }).then(response => {
        console.log('response from the service GET REVIEWS ====>', response.data);
        defer.resolve(response.data)
      })
      return defer.promise
  }



// ========================================================================================
// ADD REVIEWS - I WANT TO ADD A TIME STAMP OPTION TO THIS FUNCTION
// ========================================================================================
  this.addReview = (stars,text,room_id) => {
    const defer = $q.defer();
    $http({
      method:'post',
      url:'/rooms/reviews',
      data: {
        stars:stars,
        text:text,
        room_id:room_id
      }
    }).then(response => {
      alert(response.data)
      defer.resolve(response.data)
    })
    .catch(err => {
      console.log(err);
      alert('Forget to log in ? Sign up if you don\'t have a login')
    })
    return defer.promise
  }
})
