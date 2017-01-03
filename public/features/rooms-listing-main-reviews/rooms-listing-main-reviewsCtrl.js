angular.module('myApp').controller('roomsListingMainReviewsCtrl', ($scope,$state,$stateParams,$timeout,roomsListingMainReviewsService) => {
  $scope.noReviews = true;
  $scope.reviewsLength = 0;
  const room_id = $stateParams.room_id;
  // roomsListingMainReviewsService.getReviews(room_id).then(response => {
  //   console.log('response from roomsListingMainReviewsCtrl', response);
  //   $scope.reviews = response;
  //   if(response.length > 0){
  //     $scope.noReviews = false;
  //     $scope.reviewsLength = response.length;
  //   }
  // })
  $scope.getReviews = function(room_id){
    roomsListingMainReviewsService.getReviews(room_id).then(response => {
      console.log('response from roomsListingMainReviewsCtrl', response);
      $scope.reviews = response;
      if(response.length > 0){
        $scope.noReviews = false;
        $scope.reviewsLength = response.length;
      }
    })
  }
  $scope.getReviews(room_id)

// ==============================================================================================================
// ADD REVIEWS
// ==============================================================================================================
  $scope.addReview = (stars,text) => {
    if(!stars || !text){
      alert('cannot accept null values, please fill out the star and text input')
    }
    else {
      roomsListingMainReviewsService.addReview(stars,text,room_id).then(response => {
        console.log('this is the response from addReview',response)
      })
    }
  }


  // ==============================================================================================================
  // timeout function to call getReviews
  // ========================================================================================================================
  // $timeout(function(room_id){
  //   console.log('room_id',room_id)
  //   $scope.getReviews(room_id)
  // },3000)
})
