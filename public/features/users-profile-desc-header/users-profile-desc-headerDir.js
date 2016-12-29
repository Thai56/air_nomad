angular.module('myApp').directive('userProfileDescHeader', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/users-profile-desc-header/users-profile-desc-header.html',
    controller: 'usersProfileDescHeaderCtrl'
  }
})
