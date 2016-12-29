angular.module('myApp').controller('usersProfileListingsCtrl', ($scope,$stateParams,userProfileListingsService) => {
  const user_id = $stateParams.id
  userProfileListingsService.getHostListings(user_id).then(response => {
    $scope.listings = response;
  })
})
