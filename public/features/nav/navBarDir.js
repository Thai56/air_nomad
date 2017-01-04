angular.module('myApp').directive('myNav', function(){
  return {
    restrict:'E',
    templateUrl:'./features/nav/navbarTmpl.html',
    controller: function($scope,ngDialog,navBarService,$rootScope) {
      
      $rootScope.userNotLoggedIn = true;

      $scope.clickToRegister = () => {
        ngDialog.open({ template: './features/signup/signup.html', className: 'ngdialog-theme-default', controller:'signupCtrl'});
      }
      $scope.clickToLogin = () => {
        ngDialog.open({ template:'./features/login/login.html', className:'ngdialog-theme-default', controller:'loginCtrl'});
      }
      $scope.logout = ()=> {
        navBarService.logout();
        $rootScope.userNotLoggedIn = true;
      }
// ========================================================================================================================
// get user function
// ======================================================================================================================================================
      function getUser() {
        navBarService.getUser().then(function(user) {
          if (user) {
            console.log('user not logged in is ===> ', $scope.userNotLoggedIn);
            $scope.user = user.username;
            // $scope.userNotLoggedIn = false;
          }
          else  {
            $scope.user = 'NOT LOGGED IN';
          }
        })
      }
      getUser()
      // $scope.$watch('userNotLoggedIn')
    }

  }
})
