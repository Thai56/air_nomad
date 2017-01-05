angular.module('myApp').controller('userRoomsListingsCtrl', ($scope,$stateParams,$rootScope,userRoomsListingsService,loginService)=> {
  loginService.getUser().then(user => {
      if (user){
         $scope.user = user;
         console.log(user);
         userRoomsListingsService.getListingsForView($scope.user.id)
         .then(response => {
           $scope.yourlistings = response
           console.log($scope.yourlistings);
         })
      }
      else  {
          $scope.user = 'NOT LOGGED IN'
      };
  })
})
// select * from listing_images
// join listings on listings.id = listing_images.listing_id
// join rooms on rooms.id = listings.room_id
// where listings.user_id = 6
