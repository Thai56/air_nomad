angular.module('myApp').controller('navbarDropdownCtrl', ($scope,$stateParams,$rootScope,navbarDropdownService,$log) => {
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
  navbarDropdownService.logout();
  $rootScope.userNotLoggedIn = true;
}
})
