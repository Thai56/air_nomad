angular.module('myApp').controller('loginCtrl', ($scope, loginService) => {
  $scope.loginUser = function(credentials) {
    loginService.loginUser(credentials).then(response => {
      alert('You are now logged in')
    })

  }

})
