angular.module('myApp').directive('userProfilePic', ()=> {
  return {
    restrict:"AE",
    templateUrl:'./features/users-profile-pic/users-profile-pic.html',
    controller:'usersProfilePicCtrl'
  }
})
