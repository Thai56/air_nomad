angular.module('myApp').controller('conversationsMessageBoxCtrl', ($scope,$stateParams,conversationsMessageBoxService) => {
  const user_id = $stateParams.user_id;
  conversationsMessageBoxService.getConversationUsername(user_id)
  .then(response => {
    $scope.username = response[0];
  })
})
