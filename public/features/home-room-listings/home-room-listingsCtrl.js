angular.module('myApp').controller('homeRoomListingsCtrl', ($scope,homeRoomListingsService) => {
  homeRoomListingsService.getListingsForHome().then(response=>{
    console.log('response from homeListingCtrl',response)
    $scope.listings = response;
  })
})
