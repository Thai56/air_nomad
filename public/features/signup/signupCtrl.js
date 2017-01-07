angular.module('myApp').controller('signupCtrl', ($scope,signupService,ngDialog) => {
  $scope.registerUser = (register )=> {
    if(!register || !register.first_name || !register.last_name || !register.password){
      alert('Please Fill Out The Required Fields')
    }
    else if(register.password !== register.confirm_pw){
      alert('The Passwords Do Not Match')
    }
    else {
      signupService.registerUser(register).then(function(response){
        console.log('response from controller', response)
        alert(response)
        $scope.closeThisDialog();
        ngDialog.open({ template:'./features/login/login.html', className:'ngdialog-theme-default', controller:'loginCtrl'});
      })
    }


    console.log('this is the register obj', register);
  }
  $scope.clickToLogin = () => {
    $scope.closeThisDialog()
    ngDialog.open({ template:'./features/login/login.html', className:'ngdialog-theme-default', controller:'loginCtrl'});
  }
})
