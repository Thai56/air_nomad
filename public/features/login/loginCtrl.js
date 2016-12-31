angular.module('myApp').controller('loginCtrl', ($scope, loginService, $routeParams) => {
  $scope.loginUser = function(email,password) {
    console.log('ccreds from the loginCtrl',email,password)
    loginService.loginUser({
      username:email,
      password:password
    })
    .then(function(res) {
      getUser();
    })

  }


// ================================================================================================================================
// check if logged in
// ================================================================================================================================================================
  loginService.checkForToken($routeParams.token);

function getUser() {
  loginService.getUser().then(function(user) {
    if (user) $scope.user = user.username;
    else   $scope.user = 'NOT LOGGED IN';
  })
}

getUser();

})
