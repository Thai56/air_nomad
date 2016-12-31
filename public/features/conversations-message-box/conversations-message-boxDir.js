angular.module('myApp').directive('conversationMessageBox', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/conversations-message-box/conversations-message-box.html',
    controller:'conversationsMessageBoxCtrl'
  }
})
