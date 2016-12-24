angular.module('myApp').controller('roomsListingMainAboutCtrl', ($scope,$stateParams,roomsListingMainAboutService) => {
  const room_id = $stateParams.room_id;
    roomsListingMainAboutService.getRoomListingMainAccessories(room_id).then(response => {
      console.log('response from about CTrl',response);
      $scope.accessories = response;
      console.log('response [0]',$scope.accessories[0])
       $scope.obj = $scope.accessories[0];
    });


})
