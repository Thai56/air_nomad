angular.module('myApp').directive('roomListingMainReviews', function(){
  return {
    restrict:'AE',
    templateUrl:'./features/rooms-listing-main-reviews/rooms-listing-main-reviews.html',
    controller: 'roomsListingMainReviewsCtrl',
    controllerAs: 'App'
  }
})
