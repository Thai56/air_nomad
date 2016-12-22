angular.module('myApp').controller('loginCtrl', ($scope, loginService) => {
  $scope.loginUser = function(credentials) {
    console.log('ccreds from the loginCtrl',credentials)
    loginService.loginUser(credentials).then(response => {
      alert('You are now logged in')
    })

  }

})
