angular.module('myApp').directive('roomListingProfilePic', ()=> {
  return {
    restrict:'AE',
    templateUrl:'./features/rooms-listing-profile-pic/rooms-listing-profile-pic.html',
    controller:'roomsListingProfilePicCtrl'
  }
})
