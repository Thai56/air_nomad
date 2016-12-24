'use strict';

angular.module('myApp', ['ui.router', 'ui.bootstrap', 'ngDialog']).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: './views/home/home.html',
    controller: 'homeCtrl'
  }).state('test', {
    templateUrl: './views/test.html',
    url: '/test'
  }).state('rooms', {
    url: '/rooms/:room_id',
    controller: 'roomsCtrl',
    templateUrl: './views/rooms/rooms.html'
  });

  $urlRouterProvider.otherwise('/');
});
//  dependency of ui-bootstrap carousel from DEMO 'ngSanitize' / ,'ngAnimate'
// Now going to check index.html for any script tags or links that may help carousel
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

angular.module('myApp').controller('homeRoomListingsCtrl', function ($scope, homeRoomListingsService) {
  homeRoomListingsService.getListingsForHome().then(function (response) {
    console.log('response from homeListingCtrl', response);
    $scope.listings = response;
  });
});
'use strict';

angular.module('myApp').directive('homeRoomListings', function () {
  return {
    restrict: 'AE',
    controller: 'homeRoomListingsCtrl',
    templateUrl: './features/home-room-listings/home-room-listings.html'
  };
});
'use strict';

angular.module('myApp').service('homeRoomListingsService', function ($http, $q) {
  this.getListingsForHome = function () {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/rooms/listings'
    }).then(function (response) {
      console.log('response from homeRoomListingsService', response);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
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

angular.module('myApp').controller('roomListingMainDescCtrl', function ($scope, $stateParams, roomListingMainDescService) {
  var room_id = $stateParams.room_id;

  roomListingMainDescService.getRoomListingMainDesc(room_id).then(function (response) {
    console.log('working from controller descripition service', response);
    $scope.descriptions = response;
    console.log('this is descriptions', $scope.descriptions);
  });
});
'use strict';

angular.module('myApp').directive('roomListingMainDesc', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/room-listing-main-desc/room-listing-main-desc.html',
    controller: 'roomListingMainDescCtrl'
  };
});
'use strict';

angular.module('myApp').service('roomListingMainDescService', function ($http, $q) {
  this.getRoomListingMainDesc = function (room_id) {
    var defer = $q.defer();
    $http({
      method: 'GET',
      url: '/rooms/desc/' + room_id
    }).then(function (response) {
      console.log('response from service description', response);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('roomsListingCarouselCtrl', function ($scope, $stateParams, roomsListingCarouselService) {
    // ==========================================================================================
    // variables
    // ============================================================================================================
    var room_id = $stateParams.room_id;

    // ============================================================================================================
    // carousel
    // ============================================================================================================
    roomsListingCarouselService.getCarouselImages(room_id).then(function (response) {
        $scope.myInterval = 3000;
        $scope.slides = [];
        console.log('resonse that is back from the carousel endpoint', response);

        $scope.image_Array = response;

        for (var i = 0, j = $scope.image_Array.length; i < j; i++) {
            $scope.slides.push({
                image: '../../' + $scope.image_Array[i].image_url,
                type: 'room images',
                text: $scope.image_Array[i].image_desc
            });
        }
        console.log('thiss is the scope slides within controller', $scope.slides);
    });
});

// // // //
// Test
// // // //

// $scope.slides.push({
//   image:'../../'+$scope.obj.image_url,
//   type:'room_images',
//   text:$scope.obj.image_desc
// })


// $scope.slides = [

// ,
// {
//   image:'../../IMG/caps/teepers-cap_back_blackred-color-white.jpg',
//   type:'caps',
//   text:'Caps'
// },
// {
//   image:'../../IMG/sweaters/naksweat-black-yellow.jpg',
//   type:'sweaters',
//   text:'Hoodies'
// },
// {
//   image:'../../IMG/shorts/nakshorts-black-gold.jpg',
//   type:'shorts',
//   text:'Thai Shorts'
// }
// ]
'use strict';

angular.module('myApp').directive('roomListingCarousel', function () {
  //  //  //
  //  THIS ROOM LISTINGCAROUSEL IS MISSING AN S AT THE END OF 'ROOM'
  //  //  //
  return {
    restrict: 'AE',
    templateUrl: './features/rooms-listing-carousel/rooms-listing-carousel.html',
    controller: 'roomsListingCarouselCtrl'
  };
});
'use strict';

angular.module('myApp').service('roomsListingCarouselService', function ($http, $q) {
  this.getCarouselImages = function (room_id) {
    var defer = $q.defer();
    console.log('room_id from service on way out', room_id);
    $http({
      method: 'get',
      url: '/rooms/carousel/' + room_id
    }).then(function (response) {
      console.log('resoinse from serviceCarouselImage', response);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('roomsListingMainAboutCtrl', function ($scope, $stateParams, roomsListingMainAboutService) {
  var room_id = $stateParams.room_id;
  roomsListingMainAboutService.getRoomListingMainAccessories(room_id).then(function (response) {
    console.log('response from about CTrl', response);
    $scope.accessories = response;
    console.log('response [0]', $scope.accessories[0]);
    $scope.obj = $scope.accessories[0];
  });
});
'use strict';

angular.module('myApp').directive('roomListingMainAbout', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/rooms-listing-main-about/rooms-listing-main-about.html',
    controller: 'roomsListingMainAboutCtrl'
  };
});
'use strict';

angular.module('myApp').service('roomsListingMainAboutService', function ($http, $q) {
  this.getRoomListingMainAccessories = function (room_id) {
    var defer = $q.defer();
    $http({
      method: 'GET',
      url: '/rooms/about/' + room_id
    }).then(function (response) {
      console.log('this is response from service on way bak', response);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('roomsListingMainCtrl', function ($scope, $stateParams, roomListingMainPicService) {
  $scope.message = 'Hello IM A PICTURE!';
  console.log('$stateparams.room_id from rooms-listing main pic controller', $stateParams.room_id);
  var room_id = $stateParams.room_id;
  roomListingMainPicService.getRoomListingMainPic(room_id).then(function (response) {
    console.log('response that was handed back from the service here in controller', response);
    $scope.roomListingMainPic = response;
    console.log('last one', $scope.roomListingMainPic);
  });
});
'use strict';

angular.module('myApp').service('roomListingMainPicService', function ($http, $q) {
  this.getRoomListingMainPic = function (room_id) {
    var defer = $q.defer();
    $http({
      method: 'GET',
      url: '/rooms/img/' + room_id
    }).then(function (response) {
      console.log('response from the roomlistingsmainpicservice', response);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').directive('roomListingMainPic', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/rooms-listing-main-pic/room-listing-main-pic.html',
    controller: 'roomsListingMainCtrl'
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
'use strict';

angular.module('myApp').controller('roomsCtrl', function ($scope, $stateParams) {
  $scope.message = 'welcoming to the room view';
  console.log('log $stateParams', $stateParams);
});
//# sourceMappingURL=bundle.js.map
