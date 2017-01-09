angular.module('myApp').controller('usersEditProfileCtrl',($scope,$rootScope,$stateParams,loginService,usersEditProfileService)=> {
  loginService.getUser()
    .then(function(user) {
      if (user){
         $scope.user = user;
         console.log(user);
      }
      else  {
          $scope.user = 'NOT LOGGED IN'
      };
    })

  // Check user object
  $scope.saveChanges = (editObj) => {
    console.log(editObj);
    if (!editObj) {
      return alert('you need to change something')
    }
    let confirm = prompt('are you sure you want about these changes?','yes! I am Positive! Press OK!')
    console.log(confirm);
    if(confirm !== null){
      // call usersEditProfileService.saveChanges and pass editObj
      usersEditProfileService.saveChanges(editObj).then(res => {

          // $rootScope.userData = $scope.user;

        alert(res)
      })
    }

  }
})
