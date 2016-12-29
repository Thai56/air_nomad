angular.module('myApp').directive('userProfileListings', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/users-profile-listings/users-profile-listings.html',
    controller:'usersProfileListingsCtrl'
  }
})
