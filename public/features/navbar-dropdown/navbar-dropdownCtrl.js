angular.module('myApp').controller('navbarDropdownCtrl', ($scope,$stateParams,$rootScope,navbarDropdownService,loginService,navBarService,ngDialog) => {
  function getUser() {
    navbarDropdownService.getUser().then(function(user) {
      if (user){
        console.log(user);
        $rootScope.currentUser = user;
        console.log('This is the use that is signed in ===>',$rootScope.user);
         $scope.user = user.username;
         navbarDropdownService.getUserById(user.id).then(response => {
           $rootScope.userData = response
           console.log($scope.userData);
         })
      }
      else  {
          $scope.user = 'NOT LOGGED IN'
      };
    })
  }
  $rootScope.$watch('user', (oldVal,newVal)=> {
    console.log('This function is firing/working');
      getUser()
  })
  // $rootScope.$watch('userData',(newVal,oldVal) => {
  //   if(newVal){
  //     oldVal = newVal;
  //   }
  // })
  getUser();
  //   //    //
// * logout * //
//   //    //
$scope.logout = ()=> {
  navBarService.logout().then(response => {
    console.log(response)
    loginService.getUser().then(user => {
      if(user){
        $scope.user = user
      }
      else {
        $scope.user = "NO USER!"
      }
    })
  });
  $rootScope.userNotLoggedIn = true;
}
$scope.accountSettings = () => {
  console.log('working');
  ngDialog.open({ template:'./features/accountSettings/accountSettings.html', className:'ngdialog-theme-default', controller:'accountSettingsCtrl'});
}
})
