angular.module('myApp').controller('accountSettingsCtrl', ($scope,loginService,accountSettingsService,$state,$rootScope)=> {
  $scope.deleteAccount = function() {
    console.log('DELET ACCOUNT BUTTON WORKING');
    loginService.getUser().then(user => {
      if(user){
        $scope.user = user
        console.log($scope.user);
      }
      else {
        $scope.user = "NO USER SIGNED IN "
      }
      accountSettingsService.deleteAccount($scope.user.id).then(response => {
          loginService.getUser().then(user => {
            if(user){
              $scope.user = user
            }
            else {
              $scope.user = "USER NOT FOUND"
            }
          })
          $rootScope.userNotLoggedIn = true
          $scope.closeThisDialog()
          $state.go(response.redirect)
        })
    })
  }

})
