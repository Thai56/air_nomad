angular.module('myApp').controller('navbarDropdownCtrl', ($scope,$stateParams,$rootScope,navbarDropdownService,$log) => {
  function getUser() {
    navbarDropdownService.getUser().then(function(user) {
      if (user){
        console.log(user);
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

  getUser();
  //   //    //
// * logout * //
//   //    //
$scope.logout = ()=> {
  navbarDropdownService.logout();
  $rootScope.userNotLoggedIn = true;
}
})
