angular.module('myApp').controller('roomsListingMainReviewsCtrl', ($scope,roomsListingMainReviewsService) => {
  $scope.alert = function(val){
    alert(val);
  }
})
