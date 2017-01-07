angular.module('myApp').controller('navbarDropdownCtrl', ($scope,$stateParams,$rootScope,navbarDropdownService,loginService,navBarService) => {
  function getUser() {
    navbarDropdownService.getUser().then(function(user) {
      if (user){
        console.log(user);
        $rootScope.currentUser = user;
        console.log('This is the use that is signed in ===>',$rootScope.user);
         $scope.user = user.username;
         navbarDropdownService.getUserById(user.id).then(response => {
           $scope.userData = response
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
})
