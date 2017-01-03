angular.module('myApp').controller('navbarDropdownCtrl', ($scope,$stateParams,$rootScope,navbarDropdownService,$log) => {
  function getUser() {
    navbarDropdownService.getUser().then(function(user) {
      if (user){
        console.log(user);
         $scope.user = user.username;
         navbarDropdownService.getUserById(user.id)
      }
      else  {
          $scope.user = 'NOT LOGGED IN'
      };
    })
  }

  getUser();

})
