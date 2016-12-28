angular.module('myApp').controller('roomsListingMainReviewsCtrl', ($scope,$stateParams,roomsListingMainReviewsService) => {
  $scope.noReviews = true;
  $scope.reviewsLength = 0;
  const room_id = $stateParams.room_id;
  roomsListingMainReviewsService.getReviews(room_id).then(response => {
    console.log('response from roomsListingMainReviewsCtrl', response);
    $scope.reviews = response;
    if(response.length > 0){
      $scope.noReviews = false;
      $scope.reviewsLength = response.length;
    }
  })

// ==============================================================================================================
// ADD REVIEWS
// ==============================================================================================================
  $scope.addReview = (stars,text) => {
    if(!stars || !text){
      alert('cannot accept null values, please fill out the star and text input')
    }
    else {
      roomsListingMainReviewsService.addReview(stars,text,room_id)
    }
  }
})
