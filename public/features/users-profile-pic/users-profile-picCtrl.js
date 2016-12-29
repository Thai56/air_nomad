angular.module('myApp').controller('usersProfilePicCtrl', ($scope,$stateParams,usersProfilePicService) => {
  const user_id = $stateParams.id;
  usersProfilePicService.getUsersProfilePic(user_id).then(response => {
    console.log('this is response from UsersProfilePicCtrl',response);
    $scope.usersProfilePic = response;
    console.log($scope.usersProfilePic);
  })
})
