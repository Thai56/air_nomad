angular.module('myApp').directive('myNav', function(){
  return {
    restrict:'E',
    templateUrl:'./features/nav/navbarTmpl.html',
    controller: function($scope,ngDialog,navBarService) {
      $scope.clickToRegister = () => {
        ngDialog.open({ template: './features/signup/signup.html', className: 'ngdialog-theme-default', controller:'signupCtrl'});
      }
      $scope.clickToLogin = () => {
        ngDialog.open({ template:'./features/login/login.html', className:'ngdialog-theme-default', controller:'loginCtrl'});
      }
      $scope.logout = ()=> {
        navBarService.logout();
      }
    }

  }
})
