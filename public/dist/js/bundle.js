'use strict';

angular.module('myApp', ['ui.router', 'ngDialog']).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: './views/home/home.html',
    controller: 'homeCtrl'
  }).state('test', {
    templateUrl: './views/test.html',
    url: '/test'
  });

  $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('myApp').directive('myNav', function () {
  return {
    restrict: 'E',
    templateUrl: './features/nav/navbarTmpl.html',
    controller: function controller($scope, ngDialog) {
      $scope.clickToRegister = function () {
        ngDialog.open({ template: './features/signup/signup.html', className: 'ngdialog-theme-default', controller: 'signupCtrl' });
      };
      $scope.clickToLogin = function () {
        ngDialog.open({ template: './features/login/login.html', className: 'ngdialog-theme-default', controller: 'loginCtrl' });
      };
    }

  };
});
'use strict';

angular.module('myApp').controller('loginCtrl', function ($scope, loginService) {
  $scope.loginUser = function (credentials) {
    loginService.loginUser(credentials).then(function (response) {
      alert('You are now logged in');
    });
  };
});
'use strict';

angular.module('myApp').service('loginService', function ($http, $q) {
  this.loginUser = function (credentials) {
    var defer = $q.defer();
    $http({
      method: 'post',
      url: '/users/auth/local',
      data: credentials
    }).then(function (response) {
      console.log(response.data);
      defer.resolve(response);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('signupCtrl', function ($scope, signupService) {
  $scope.registerUser = function (register) {
    signupService.registerUser(register).then(function (response) {
      console.log('response from controller', response);
    });
  };
  $scope.clickToLogin = function () {
    ngDialog.open({ template: './features/login/login.html', className: 'ngdialog-theme-default', controller: 'loginCtrl' });
  };
});
'use strict';

angular.module('myApp').service('signupService', function ($http, $q) {
  this.registerUser = function (user) {
    var defer = $q.defer();
    $http({
      method: 'POST',
      url: '/users/edit',
      data: user
    }).then(function (response) {
      console.log(response);
      defer.resolve(response);
    }).catch(function (err) {
      defer.resolve(err);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('homeCtrl', function ($scope, homeService) {
  $scope.newmessage = 'Welcome to the Home page';
  var foo = 'bar';
  $scope.message = homeService.getMessage();
});
'use strict';

angular.module('myApp').service('homeService', function ($http, $q) {
  var message = 'Hello From the home service';
  this.getMessage = function () {
    return message;
  };
});
//# sourceMappingURL=bundle.js.map
