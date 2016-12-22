angular.module('myApp').controller('signupCtrl', ($scope,signupService) => {
  $scope.registerUser = (register )=> {
    signupService.registerUser(register).then(function(response){
      console.log('response from controller', response)
    })
  }
  $scope.clickToLogin = () => {
    ngDialog.open({ template:'./features/login/login.html', className:'ngdialog-theme-default', controller:'loginCtrl'});
  }
})
