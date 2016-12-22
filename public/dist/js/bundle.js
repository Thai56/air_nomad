'use strict';

angular.module('myApp', ['ui.router', 'ngDialog', 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider) {
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

angular.module('myApp').controller('loginCtrl', function ($scope, loginService) {
  $scope.loginUser = function (credentials) {
    console.log('ccreds from the loginCtrl', credentials);
    loginService.loginUser(credentials).then(function (response) {
      alert('You are now logged in');
    });
  };
});
'use strict';

angular.module('myApp').service('loginService', function ($http, $q) {
  this.loginUser = function (credentials) {
    console.log('creds from login', credentials);
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

angular.module('myApp').controller('homeHeaderCtrl', function ($scope, homeHeaderService) {
  $scope.findLocationByKeyword = function (keyword) {
    console.log('keyword from control first', keyword);
    homeHeaderService.findLocationByKeyword(keyword).then(function (response) {
      console.log(response);
    });
  };
});
'use strict';

angular.module('myApp').service('homeHeaderService', function ($http, $q) {
  this.findLocationByKeyword = function (keyword) {
    var defer = $q.defer();
    console.log('service call first', keyword.location);
    $http({
      method: "get",
      url: 'rooms/search/' + keyword.location
    }).then(function (response) {
      console.log(response);
      defer.resolve(response);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').directive('homeHeader', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/home_header/homeHeader.html',
    controller: 'homeHeaderCtrl'
  };
});
'use strict';

angular.module('myApp').controller('homeRoomListingsCtrl', function ($scope) {});
'use strict';

angular.module('myApp').directive('homeRoomListings', function () {
  return {
    restrict: 'AE',
    controller: 'homeRoomListingsCtrl',
    templateUrl: './features/home-room-listings/home-room-listings.html'
  };
});
'use strict';

angular.module('myApp').service('homeRoomListingsService', function ($http, $q) {});
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

angular.module('myApp').controller('endDatepickerCtrl', function ($scope) {});
'use strict';

angular.module('myApp').directive('endDatepicker', function () {
  return {
    restrict: 'AE',
    controller: 'endDatepickerCtrl',
    templateUrl: './features/home_header/homeHeader-datepickers/end/end_datepicker.html',
    require: 'ngModel',
    link: function link(scope, elem, attr, ngModelCtrl) {
      elem.on('click', function () {
        return console.log(ngModelCtrl);
      });
    }
  };
});
'use strict';

angular.module('myApp').controller('start_datepickerCtrl', function ($scope) {});
'use strict';

angular.module('myApp').directive('startDatepicker', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/home_header/homeHeader-datepickers/start/start_datepicker.html',
    controller: 'start_datepickerCtrl'
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
