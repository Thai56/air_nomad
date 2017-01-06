angular.module('myApp').controller('loginCtrl', ($scope, loginService, $routeParams,$rootScope,navbarDropdownService,ngDialog) => {
  $scope.loginUser = function(email,password) {
    console.log('ccreds from the loginCtrl',email,password)
    loginService.loginUser({
      username:email,
      password:password
    })
    .then(function(res) {
      if(res.data !== "Not Found"){
        $scope.closeThisDialog()
      }
      $scope.email = ''
      $scope.password = ''
      getUser();
    })

  }

  $scope.clickToSignup = () => {
    $scope.closeThisDialog()
    ngDialog.open({ template: './features/signup/signup.html', className: 'ngdialog-theme-default', controller:'signupCtrl'});
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
