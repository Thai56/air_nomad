angular.module('myApp').controller('roomsListingMainReviewsCtrl', ($scope,roomsListingMainReviewsService) => {
  $scope.clickHandler = (val1,val2) => {
    console.log(val1,val2)
  }
})
