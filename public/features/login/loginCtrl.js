angular.module('myApp').controller('loginCtrl', ($scope, loginService, $routeParams,$rootScope,navbarDropdownService) => {
  $scope.loginUser = function(email,password) {
    console.log('ccreds from the loginCtrl',email,password)
    loginService.loginUser({
      username:email,
      password:password
    })
    .then(function(res) {
      $scope.email = ''
      $scope.password = ''
      getUser();
    })

  }


// ================================================================================================================================
// check if logged in
// ================================================================================================================================================================
  loginService.checkForToken($routeParams.token);

function getUser() {
  loginService.getUser().then(function(user) {
    if (user){
      //  $scope.user = user.username;
       $rootScope.user = user;
      console.log('this is user not logged in ==> ',$rootScope.userNotLoggedIn);
      $rootScope.userNotLoggedIn = false;
    }
    else  {
        $scope.user = 'NOT LOGGED IN'
    };
  })
}

getUser();

})
