angular.module('myApp').controller('conversationsProfilePicCtrl', ($scope,$stateParams,conversationsProfilePicService)=> {
  const user_id = $stateParams.user_id;
  conversationsProfilePicService.getConversationProfilePic(user_id).then(response => {
    $scope.profilePic = response;
  })
})
