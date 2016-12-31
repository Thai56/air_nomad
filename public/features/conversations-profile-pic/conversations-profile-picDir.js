angular.module('myApp').directive('conversationProfilePic', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/conversations-profile-pic/conversations-profile-pic.html',
    controller:'conversationsProfilePicCtrl'
  }
})
