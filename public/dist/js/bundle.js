'use strict';

angular.module('myApp', ['ui.router', 'ui.bootstrap', 'ngDialog', 'angular-input-stars', 'ngRoute', 'ngStorage']).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: './views/home/home.html',
    controller: 'homeCtrl'
  }).state('rooms', {
    url: '/rooms/:room_id',
    controller: 'roomsCtrl',
    templateUrl: './views/rooms/rooms.html'
  }).state('users', {
    url: '/users/:id',
    controller: 'usersCtrl',
    templateUrl: './views/users/users.html'
  }).state('conversations', {
    url: '/conversations/:user_id/messages',
    controller: 'conversationsCtrl',
    templateUrl: './views/conversations/conversations.html'
  }).state('search', {
    url: '/search',
    controller: 'searchCtrl',
    templateUrl: './views/search/search.html'
  }).state('search.listings', {
    templateUrl: './views/search-listings/search-listings.html',
    url: '/listings/:search_id/',
    controller: 'searchListingsCtrl',
    params: { myParam: null }
  }).state('user_rooms', {
    url: '/user_rooms',
    templateUrl: './views/user_rooms/user_rooms.html',
    controller: 'userRoomsCtrl'
  }).state('user_rooms.user_listings', {
    url: '/user_listings',
    templateUrl: './views/user_rooms-listings/user_rooms-listings.html',
    controller: 'userRoomsListingsCtrl',
    params: { viewParam: null }
  }).state('user_rooms.user_reservations', {
    url: '/user_reservations',
    templateUrl: './views/user_rooms-reservations/user_rooms-reservations.html',
    params: { viewParam: null }
  }).state('user_rooms.user_trips', {
    url: '/user_trips',
    templateUrl: './views/user_rooms-trips/user_rooms-trips.html',
    params: { viewParam: null }
  }).state('users_edit_profile', {
    url: '/users/profile/edit',
    templateUrl: './views/users-edit-profile/users-edit-profile.html',
    params: { viewParam: null },
    controller: 'usersEditProfileCtrl'
  }).state('error', {
    url: '/error',
    templateUrl: './views/err/err.html'
  });

  $urlRouterProvider.otherwise('/');
});
//  dependency of ui-bootstrap carousel from DEMO 'ngSanitize' / ,'ngAnimate'
// Now going to check index.html for any script tags or links that may help carousel
'use strict';

angular.module('myApp').controller('conversationsMessageBoxCtrl', function ($scope, $stateParams, $location, $localStorage, conversationsMessageBoxService, loginService) {

  var current_user_id = $stateParams.user_id;
  console.log($stateParams.user_id);
  conversationsMessageBoxService.getConversation(current_user_id).then(function (response) {
    console.log(response);
    $scope.messagesFromBackend = response;
  });

  conversationsMessageBoxService.getConversationUsername(current_user_id).then(function (response) {
    $scope.username = response[0];
  });

  loginService.getUser().then(function (user) {
    if (user) {
      $scope.sender = user;
      console.log($scope.sender);
    } else {
      $scope.user = 'NOT LOGGED IN';
    };
  });

  $scope.insertMessage = function (user_message) {
    console.log($scope.user_message, current_user_id);
    var message_time = new Date();
    conversationsMessageBoxService.insertMessage(user_message, current_user_id, message_time).then(function (response) {
      return console.log(response.data);
    });
  };
  // ===================================================================================================================
  // jQuery
  // ==========================================================================================================================================

  jQuery(function ($) {
    var socket = io.connect();
    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#chat');

    $messageForm.submit(function (e) {
      e.preventDefault();
      socket.emit('send message', $messageBox.val());
      $messageBox.val('');
    });

    socket.on('new message', function (data) {
      console.log('this is the data', data);
      $chat.append('<div ng-style=' + '>' + '<h4>' + '</h4>' + data + '</div>');
    });
  });
  // '"{"width":"100%","background":"white","border-radius":"44px","border-bottom":"1px solid black"}"' +
  // + $scope.sender.first_name
  // ':' +
  // + '<br/>'
  // ==========================================================================================================================================
});
'use strict';

angular.module('myApp').directive('conversationMessageBox', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/conversations-message-box/conversations-message-box.html',
    controller: 'conversationsMessageBoxCtrl'
  };
});
'use strict';

angular.module('myApp').service('conversationsMessageBoxService', function ($http, $q, $rootScope) {
  this.getConversationUsername = function (user_id) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: 'conversations/username/' + user_id
    }).then(function (response) {
      defer.resolve(response.data);
    });
    return defer.promise;
  };

  this.insertMessage = function (user_message, message_recepient, message_time) {
    console.log(user_message, message_recepient, message_time);
    var defer = $q.defer();
    $http({
      method: 'post',
      url: '/conversations/insert_message',
      data: {
        message_recepient: message_recepient * 1,
        user_message: user_message,
        message_time: message_time
      }
    }).then(function (response) {
      console.log('response'.response.data);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
  // ================================================================
  // get conversations
  // ========================================================================
  this.getConversation = function (host_id) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/conversations/messages/' + host_id
    }).then(function (response) {
      console.log('this is the response . data', response.data);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
  // ===========================================================================================v==========================
  // angular socket.io still trying to make work but too tired at the moment
  // ==================================================================================================================================
  //   this.socket = ($rootScope) => {
  //   let socket =io.connect()
  //
  //   return {
  //     on:on,
  //     emit:emit
  //   }
  // //Socket 'on' and 'emit' methods here
  // this.on = (eventName,callBack) => {
  //   socket.on(eventname, () => {
  //     let args = arguments;
  //     $rootScope.$apply(() => {
  //       callback.apply(socket,args);
  //     });
  //   });
  // };
  //
  // this.emit =(eventName,data,callback) => {
  //   socket.emit(evenName,data,() => {
  //     let args = arguments;
  //     $rootScope.$apply(() => {
  //       if(callback){
  //         callback.apply(socket,args);
  //       }
  //     });
  //   });
  // };
  // }
});
'use strict';

angular.module('myApp').controller('conversationsProfilePicCtrl', function ($scope, $stateParams, conversationsProfilePicService) {
  var user_id = $stateParams.user_id;
  conversationsProfilePicService.getConversationProfilePic(user_id).then(function (response) {
    $scope.profilePic = response;
  });
});
'use strict';

angular.module('myApp').directive('conversationProfilePic', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/conversations-profile-pic/conversations-profile-pic.html',
    controller: 'conversationsProfilePicCtrl'
  };
});
'use strict';

angular.module('myApp').service('conversationsProfilePicService', function ($http, $q) {
  this.getConversationProfilePic = function (user_id) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/conversations/profile-pic/' + user_id
    }).then(function (response) {
      console.log('this is the resposne.data', response.data);
      defer.resolve(response.data);
    });
    return defer.promise;
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
      console.log('back');
      defer.resolve(response.data);
    });
    console.log(12, 'back');
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

angular.module('myApp').controller('loginCtrl', function ($scope, loginService, $routeParams, $rootScope, navbarDropdownService, ngDialog) {
  $scope.loginUser = function (email, password) {
    console.log('ccreds from the loginCtrl', email, password);
    loginService.loginUser({
      username: email,
      password: password
    }).then(function (res) {
      if (res.data !== "Not Found") {
        $scope.closeThisDialog();
      }
      $scope.email = '';
      $scope.password = '';
      getUser();
    });
  };

  $scope.clickToSignup = function () {
    $scope.closeThisDialog();
    ngDialog.open({ template: './features/signup/signup.html', className: 'ngdialog-theme-default', controller: 'signupCtrl' });
  };
  // ================================================================================================================================
  // check if logged in
  // ================================================================================================================================================================
  loginService.checkForToken($routeParams.token);

  function getUser() {
    loginService.getUser().then(function (user) {
      if (user) {
        //  $scope.user = user.username;
        $rootScope.user = user;
        console.log('this is user not logged in ==> ', $rootScope.userNotLoggedIn);
        $rootScope.userNotLoggedIn = false;
      } else {
        $scope.user = 'NOT LOGGED IN';
      };
    });
  }

  getUser();
});
'use strict';

angular.module('myApp').service('loginService', function ($http, $q, $state) {
  this.loginUser = function (credentials) {
    return $http({
      method: "POST",
      url: '/login',
      data: credentials
    }).then(function (res) {
      console.log('this is the res from loginUserService', res);
      // if( typeof res.data.redirect =='string'){
      //   console.log('res.data.redirect',res.data.redirect);
      //   // $state.go(res.data.redirect)
      // }
      return res.data;
    }).catch(function (err) {
      alert('please log in or click to sign up ');
      console.log('ERROR LOGGING IN!', err);
    });
  };

  this.getUser = function () {
    return $http({
      method: 'GET',
      url: '/auth/me'
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.checkForToken = function (token) {
    if (token) {
      console.log('checkForToken', token);
      sessionStorage.setItem('myToken', token);
    }
  };
});
'use strict';

angular.module('myApp').directive('myNav', function () {
  return {
    restrict: 'E',
    templateUrl: './features/nav/navbarTmpl.html',
    controller: function controller($scope, ngDialog, navBarService, $rootScope) {

      $rootScope.userNotLoggedIn = true;

      $scope.clickToRegister = function () {
        ngDialog.open({ template: './features/signup/signup.html', className: 'ngdialog-theme-default', controller: 'signupCtrl' });
      };
      $scope.clickToLogin = function () {
        ngDialog.open({ template: './features/login/login.html', className: 'ngdialog-theme-default', controller: 'loginCtrl' });
      };
      // $scope.logout = ()=> {
      //   navBarService.logout();
      //   $rootScope.userNotLoggedIn = true;
      // }
      // ========================================================================================================================
      // get user function
      // ======================================================================================================================================================
      function getUser() {
        navBarService.getUser().then(function (user) {
          if (user) {
            console.log(user);
            console.log('user not logged in is ===> ', $scope.userNotLoggedIn);
            $rootScope.user_name = user.username;
            $rootScope.userNotLoggedIn = false;
          } else {
            $scope.user = 'NOT LOGGED IN';
          }
        });
      }
      getUser();
      // $rootScope.$watch('userNotLoggedIn', (oldVal,newVal) => {
      //   if(newVal){
      //     getUser();
      //     oldVal = newVal;
      //   }
      // })
    }

  };
});
'use strict';

angular.module('myApp').service('navBarService', function ($http, $q) {
  this.logout = function () {
    console.log('fireing');
    return $http({
      method: 'GET',
      url: '/logout'
    }).then(function (res) {
      console.log(res.data);
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.getUser = function () {
    return $http({
      method: 'GET',
      url: '/auth/me'
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };
});
'use strict';

angular.module('myApp').controller('navSearchInputCtrl', function ($scope, $state, $stateParams, navSearchInputService) {
  $scope.goToSearchState = function (search_id) {
    console.log('search_id', search_id);
    $state.go('search.listings', { search_id: search_id });
  };
});
'use strict';

angular.module('myApp').directive('navSearchInput', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/nav-search-input/nav-search-input.html',
    controller: 'navSearchInputCtrl'
  };
});
'use strict';

angular.module('myApp').service('navSearchInputService', function ($http, $q) {
  this.getMessage = function () {
    return 'Hello from the nav search input service there willl be an input form here to search for nearest cities and maybe states and countries ';
  };
});
'use strict';

angular.module('myApp').controller('navbarDropdownCtrl', function ($scope, $stateParams, $rootScope, navbarDropdownService, loginService, navBarService) {
  function getUser() {
    navbarDropdownService.getUser().then(function (user) {
      if (user) {
        console.log(user);
        $rootScope.currentUser = user;
        console.log('This is the use that is signed in ===>', $rootScope.user);
        $scope.user = user.username;
        navbarDropdownService.getUserById(user.id).then(function (response) {
          $scope.userData = response;
          console.log($scope.userData);
        });
      } else {
        $scope.user = 'NOT LOGGED IN';
      };
    });
  }
  $rootScope.$watch('user', function (oldVal, newVal) {
    console.log('This function is firing/working');
    getUser();
  });

  getUser();
  //   //    //
  // * logout * //
  //   //    //
  $scope.logout = function () {
    navBarService.logout().then(function (response) {
      console.log(response);
      loginService.getUser().then(function (user) {
        if (user) {
          $scope.user = user;
        } else {
          $scope.user = "NO USER!";
        }
      });
    });
    $rootScope.userNotLoggedIn = true;
  };
});
'use strict';

angular.module('myApp').directive('navbarDropdown', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/navbar-dropdown/navbar-dropdown.html',
    controller: 'navbarDropdownCtrl'
  };
});
'use strict';

angular.module('myApp').service('navbarDropdownService', function ($http, $q) {
  this.getUser = function () {
    return $http({
      method: 'GET',
      url: '/auth/me'
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  };
  this.getUserById = function (user_id) {
    var defer = $q.defer();
    console.log('firing from getUSERBYID in navbarDropdownService');
    $http({
      method: 'get',
      url: '/users/' + user_id
    }).then(function (response) {
      console.log('this is response.data from navbarDropdownService', response.data);
      defer.resolve(response.data);
    });
    return defer.promise;
  };

  // this.logout = () => {
  //   console.log('fireing');
  //   return $http({
  //     method: 'GET',
  //     url: '/logout'
  //   })
  //   .then(function(res) {
  //     console.log(res.data);
  //     return res.data;
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   })
  // }
});
'use strict';

angular.module('myApp').controller('roomListingMainDescCtrl', function ($scope, $stateParams, roomListingMainDescService) {
  var room_id = $stateParams.room_id;

  roomListingMainDescService.getRoomListingMainDesc(room_id).then(function (response) {
    console.log('working from controller descripition service', response);
    $scope.desc = response[0];
    console.log('this is descriptions', $scope.desc);
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

angular.module('myApp').controller('roomsListingMainBookingCtrl', function ($scope, $stateParams, $rootScope, $filter, roomsListingMainBookingService, loginService) {
    var room_id = $stateParams.room_id;
    $scope.message = roomsListingMainBookingService.getRoomListingNightlyPrice(room_id).then(function (response) {
        console.log('this is the price', response);
        $scope.price = response[0];
    });
    loginService.getUser().then(function (user) {
        console.log('ths us firing');
        if (user) {
            $scope.user = user;
            console.log(user);
        } else {
            $scope.user = 'User not logged in';
        }
    });

    $scope.reserveDate = function (start, end) {
        if (!start || !end) {
            alert('please pick a valid date');
        } else {
            $scope.chosenStartDate = $filter('date')(start, 'shortDate');
            $scope.chosenEndDate = $filter('date')(end, 'shortDate');
        }
        var startDate = $filter('date')(start, 'd');
        var endDate = $filter('date')(end, 'd');
        console.log(startDate, endDate);
        $scope.total_price = (endDate - startDate) * $scope.price.nightly_price;
        console.log($scope.total_price);
        console.log($scope.total_price);
        roomsListingMainBookingService.reserveDate(room_id, $scope.chosenStartDate, $scope.chosenEndDate, $scope.total_price).then(function (response) {
            console.log('response back into the controller on the way back ====> ', response);
            $rootScope.all_bookings_for_User = response;
            // console.log(`Your reservation has been booked from  ${response.start} to ${response.end} for ${response.length}`);
            $scope.startDate.value = '';
            $scope.endDate.value = '';
        });
    };

    $scope.goToPaypal = function (a, b, c) {
        console.log(a);
        console.log(b);
        console.log(c);
        // alert('this is working paypal function')
    };
    // =====================================================================================================================


    $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

    $rootScope.$watch('all_bookings_for_User', function (newVal, oldVal) {
        $rootScope.bookings_length = $rootScope.all_bookings_for_User.length;
        // console.log($rootScope.bookings_length);
        //run getUser after newVal[1]
    });
    $scope.$watch('startDate.value', function (newVal, oldVal) {
        newVal.setDate(newVal.getDate());
        $scope.changedDate = $filter('date')(newVal, 'yyyy-MM-dd');
        console.log($scope.changedDate);
    });

    // $rootScope.$watch('user', (newVal,oldVal) => {
    //   // loginService.getUser().then()
    //   // $scope.user_changed= newVal;
    //   console.log($scope.user);
    // })

});
'use strict';

angular.module('myApp').directive('roomListingMainBooking', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/rooms-listing-main-booking/rooms-listing-main-booking.html',
    controller: 'roomsListingMainBookingCtrl'
  };
});
'use strict';

angular.module('myApp').service('roomsListingMainBookingService', function ($http, $q) {

  this.getRoomListingNightlyPrice = function (room_id) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/rooms/nightly_price/' + room_id
    }).then(function (response) {
      console.log('this is response in service Booking', response);
      defer.resolve(response.data);
    });
    return defer.promise;
  };

  this.reserveDate = function (room_id, start, end, price) {
    console.log('======> start =====> service', start);
    var defer = $q.defer();
    $http({
      method: 'post',
      url: '/rooms/reservations',
      data: {
        room_id: room_id,
        start: start,
        end: end,
        price: price
      }
    }).then(function (response) {
      console.log('!!!response back in service', response.data);
      defer.resolve(response.data);
    }).catch(function (err) {
      alert('please log in or click to sign up ');
      console.log('ERROR LOGGING IN!', err);
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

angular.module('myApp').controller('roomsListingMainReviewsCtrl', function ($scope, $state, $stateParams, $timeout, roomsListingMainReviewsService) {
  $scope.noReviews = true;
  $scope.reviewsLength = 0;
  var room_id = $stateParams.room_id;
  // roomsListingMainReviewsService.getReviews(room_id).then(response => {
  //   console.log('response from roomsListingMainReviewsCtrl', response);
  //   $scope.reviews = response;
  //   if(response.length > 0){
  //     $scope.noReviews = false;
  //     $scope.reviewsLength = response.length;
  //   }
  // })
  $scope.getReviews = function (room_id) {
    roomsListingMainReviewsService.getReviews(room_id).then(function (response) {
      console.log('response from roomsListingMainReviewsCtrl', response);
      $scope.reviews = response;
      if (response.length > 0) {
        $scope.noReviews = false;
        $scope.reviewsLength = response.length;
      }
    });
  };
  $scope.getReviews(room_id);

  // ==============================================================================================================
  // ADD REVIEWS
  // ==============================================================================================================
  $scope.addReview = function (stars, text) {
    if (!stars || !text) {
      alert('cannot accept null values, please fill out the star and text input');
    } else {
      roomsListingMainReviewsService.addReview(stars, text, room_id).then(function (response) {
        console.log('this is the response from addReview', response);
      });
    }
  };

  // ==============================================================================================================
  // timeout function to call getReviews
  // ========================================================================================================================
  // $timeout(function(room_id){
  //   console.log('room_id',room_id)
  //   $scope.getReviews(room_id)
  // },3000)
});
'use strict';

angular.module('myApp').directive('roomListingMainReviews', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/rooms-listing-main-reviews/rooms-listing-main-reviews.html',
    controller: 'roomsListingMainReviewsCtrl',
    controllerAs: 'App'
  };
});
'use strict';

angular.module('myApp').service('roomsListingMainReviewsService', function ($http, $q) {
  this.getReviews = function (room_id) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/rooms/reviews/' + room_id
    }).then(function (response) {
      console.log('response from the service GET REVIEWS ====>', response.data);
      defer.resolve(response.data);
    });
    return defer.promise;
  };

  // ========================================================================================
  // ADD REVIEWS - I WANT TO ADD A TIME STAMP OPTION TO THIS FUNCTION
  // ========================================================================================
  this.addReview = function (stars, text, room_id) {
    var defer = $q.defer();
    $http({
      method: 'post',
      url: '/rooms/reviews',
      data: {
        stars: stars,
        text: text,
        room_id: room_id
      }
    }).then(function (response) {
      alert(response.data);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').directive('starRating', function () {
  return {
    restrict: 'A',
    template: '<ul class="rating">' + '<li ng-repeat="star in stars" ng-class="star" ng-click"toggle($index)">' + ' <i class="fa fa-star-o"></i>' + '</li>' + '</ul>',
    scope: {
      ratingValue: '=',
      max: '=',
      onRatingSelected: '&'
    },
    link: function link(scope, elem, attrs) {

      scope.updateStars = function () {
        scope.stars = [];
        for (var i = 0; i < $scope.max; i++) {
          stars.push({
            filled: i < scope.ratingValue
          });
        }
      };

      scope.toggle = function (index) {
        scope.ratingValue = index + 1;
        scope.onRatingSelected = {
          rating: index + 1
        };
      };

      scope.$watch('ratingValue', function (oldVal, newVal) {
        if (newVal) {
          updateStars();
        }
      });
    }
  };
});
'use strict';

angular.module('myApp').controller('roomsListingMapCtrl', function ($scope, $stateParams, roomsListingMapService) {
  var room_id = $stateParams.room_id;
  // =====================================================================================================
  // START OF FUNCTION
  // ==============================================================================================================
  roomsListingMapService.getRoomListingCoordinates(room_id).then(function (response) {
    console.log('this is the locations object', response[0]);
    $scope.location = response[0];
    console.log('scope locaitons', $scope.location);
    $scope.coordinates = { lat: $scope.location.latitude * 1, lng: $scope.location.longitude * 1 };
    console.log('here are the scope coordinates =======>', $scope.coordinates);

    // // // // //
    //  * map *  // // // //
    // // // // //
    var coordinates = $scope.coordinates;
    console.log('OUTSIDE OF COORDINTATES!!!', $scope.coordinates);
    var initMap = function (coordinates, google) {
      console.log('******within IIFE', coordinates);
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: coordinates,
        disableDefaultUI: false,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: 11,
        minZoom: 9,
        zoomControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT,
          style: google.maps.ZoomControlStyle.SMALL
        }
      });
      var marker = new google.maps.Marker({
        position: coordinates,
        map: map
      });
    }(coordinates, google);
    // ==============================================================================================================
  });
});
'use strict';

angular.module('myApp').directive('roomListingMap', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/rooms-listing-map/rooms-listing-map.html',
    controller: 'roomsListingMapCtrl'
  };
});
'use strict';

angular.module('myApp').service('roomsListingMapService', function ($http, $q) {
  this.getRoomListingCoordinates = function (room_id) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/rooms/locations/' + room_id
    }).then(function (response) {
      console.log('======MAP SERVICE response', response.data);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('roomsListingNearbyCtrl', function ($scope, $stateParams, roomsListingNearbyService) {
  console.log($stateParams.room_id);
  var room_id = $stateParams.room_id;
  roomsListingNearbyService.getRoomThisLocationInfo(room_id).then(function (response) {
    var current_location = response[0];
    console.log('!!!!!!!!!!CURRENT_LOCATION', current_location);
    var origin1 = {
      lat: current_location.latitude * 1,
      lng: current_location.longitude * 1
    };
    roomsListingNearbyService.getRoomsNearby(room_id, current_location.city).then(function (response) {

      console.log('RESPONSE.LENGTH', response.length);
      if (response.length > 0) {

        var destinationA = { lat: response[0].latitude * 1, lng: response[0].longitude * 1 };
        var destinationB = { lat: response[1].latitude * 1, lng: response[1].longitude * 1 };
        $scope.roomsNearby = response;
        console.log("RESPONSE", response[0]);
        var service = new google.maps.DistanceMatrixService();

        var my_distance = service.getDistanceMatrix({
          origins: [origin1],
          destinations: [destinationA, destinationB],
          travelMode: 'DRIVING',
          // unitSystem: google.maps.UnitSystem.METRIC
          unitSystem: google.maps.UnitSystem.IMPERIAL
        }, function (response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            console.log(response);
            console.log(response.rows[0].elements[0].distance.text);
            $scope.distance = response.rows[0].elements;
            var myArray = [];
            $scope.distance.forEach(function (obj) {
              myArray.push(obj.distance.text);
            });
            $scope.roomsNearby[0].dist = myArray[0];
            $scope.roomsNearby[1].dist = myArray[1];
            console.log($scope.roomsNearby);
          }
        });
        // if statement closing bracket below
      }
    });
  });
});
'use strict';

angular.module('myApp').directive('roomListingNearby', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/rooms-listing-nearby/rooms-listing-nearby.html',
    controller: 'roomsListingNearbyCtrl'
  };
});
'use strict';

angular.module('myApp').service('roomsListingNearbyService', function ($http, $q) {
  this.getRoomThisLocationInfo = function (room_id) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/rooms/listings/current_location/' + room_id
    }).then(function (response) {
      defer.resolve(response.data);
    });
    return defer.promise;
  };
  this.getRoomsNearby = function (room_id, city_name) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/rooms/listings/nearby/' + room_id + '/' + city_name
    }).then(function (response) {
      console.log('response back from getRoomsNearyby Service function', response.data);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('roomsListingProfilePicCtrl', function ($scope, $stateParams, roomsListingProfilePicService) {
  var room_id = $stateParams.room_id;
  roomsListingProfilePicService.getRoomListingProfilePic(room_id).then(function (response) {
    console.log('response from profile pic ctrl on way back', response);
    $scope.profilePic = response;
    console.log('$scope.profiePIc', $scope.profilePic);
  });
});
'use strict';

angular.module('myApp').directive('roomListingProfilePic', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/rooms-listing-profile-pic/rooms-listing-profile-pic.html',
    controller: 'roomsListingProfilePicCtrl'
  };
});
'use strict';

angular.module('myApp').service('roomsListingProfilePicService', function ($http, $q) {
  var message = 'This is the profile pic placeholder';
  this.getMessage = function () {
    return message;
  };
  this.getRoomListingProfilePic = function (room_id) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/rooms/profile-pic/' + room_id
    }).then(function (response) {
      console.log('this is the response from the profile pic service', response);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('searchFilterCtrl', function ($scope, $stateParams, $filter, $state, searchFilterService) {
  $scope.message = searchFilterService.getMessage();
  $scope.search_filter = {
    startDate: null,
    endDate: null,
    minPrice: 0,
    maxPrice: 1000,
    room_type: {
      entire: false,
      private: false,
      shared: false
    },
    tv: false,
    kitchen: false,
    internet: false,
    heating: false,
    ac: false
  };
  // ================================================================================================
  // accommodate select input
  // ================================================================================================
  $scope.accommodate = [{
    id: 1,
    label: 1,
    value: 1
  }, {
    id: 2,
    label: 2,
    value: 2
  }, {
    id: 3,
    label: 3,
    value: 3
  }, {
    id: 4,
    label: 4,
    value: 4
  }];

  $scope.selectAcc = $scope.accommodate[0];
  // ================================================================================================
  // bedrooms select input
  // ================================================================================================
  $scope.bedrooms = [{
    id: 1,
    label: 1,
    value: 1
  }, {
    id: 2,
    label: 2,
    value: 2
  }, {
    id: 3,
    label: 3,
    value: 3
  }, {
    id: 4,
    label: 4,
    value: 4
  }, {
    id: 5,
    label: 5,
    value: 5
  }];

  $scope.selectBed = $scope.bedrooms[0];
  // ================================================================================================
  // bathrooms select input
  // ================================================================================================
  $scope.bathrooms = [{
    id: 1,
    label: 1,
    value: 1
  }, {
    id: 2,
    label: 2,
    value: 2
  }, {
    id: 3,
    label: 3,
    value: 3
  }, {
    id: 4,
    label: 4,
    value: 4
  }, {
    id: 5,
    label: 5,
    value: 5
  }];

  $scope.selectBath = $scope.bathrooms[0];

  // ================================================================================================
  // search-filter-btn function need to filter through the dates in the search_obj and set logic for null/undefined values
  // ================================================================================================
  $scope.searchFilter = function (search_obj, acc, bed, bath) {
    if (!search_obj) {
      search_obj = {};
    }
    // set a label of 'select' for accommodate, bedrooms, bathrooms
    search_obj.acc = acc.value;
    search_obj.bed = bed.value;
    search_obj.bath = bath.value;
    // filter the search_obj.startDate & search_obj.endDate reference bookingCtrl
    // search_obj.startDate = $filter('date')($scope.search_filter.startDate,'shortDate')
    // search_obj.endDate = $filter('date')($scope.search_filter.endDate,'shortDate')

    // for(var k in search_obj.room_type) {
    //   if(search_obj.room_type[k] !== false){
    //     console.log(search_obj.room_type[k]);
    //     if(k === 'entire' && search_obj.room_type.entire === true){
    //       $scope.room_type[k] = 'entire'
    //     }
    //     if(k === 'shared' && search_obj.room_type.shared === true){
    //       $scope.room_type[k] = 'shared'
    //     }
    //     if(k === 'private' && search_obj.room_type.private === true){
    //       $scope.room_type[k] = 'private'
    //     }
    //   }
    //   console.log('these are the room types',search_obj.room_type);
    // }
    $state.go('search.listings', { myParam: search_obj });
  };
});
'use strict';

angular.module('myApp').directive('searchFilter', function () {
  return {
    restrict: 'E',
    templateUrl: './features/search-filter/search-filter.html',
    controller: 'searchFilterCtrl'
  };
});
'use strict';

angular.module('myApp').service('searchFilterService', function ($http, $q) {
  this.getMessage = function () {
    return 'search filter will go here';
  };
});
'use strict';

angular.module('myApp').controller('searchMapCtrl', function ($scope, $stateParams, searchMapService, $rootScope, $timeout) {

  console.log($stateParams.search_id);
  $rootScope.$watch('searchListingsResults', function () {
    console.log('====>', $rootScope.searchListingsResults);
    var searchListingsResults = $rootScope.searchListingsResults;

    // // // // //
    //  * map *  // // // //
    // // // // //
    var locations = [];
    for (var i = 0; i < searchListingsResults.length; i++) {
      console.log(searchListingsResults[i]);
      locations.push([searchListingsResults[i].listing_name, searchListingsResults[i].latitude, searchListingsResults[i].longitude]);
      console.log(locations);
    }
    var initMap = function (location, google) {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: searchListingsResults[0].latitude * 1, lng: searchListingsResults[0].longitude * 1 },
        disableDefaultUI: false,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: 11,
        minZoom: 9,
        zoomControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT,
          style: google.maps.ZoomControlStyle.SMALL
        }
      });
      var infowindow = new google.maps.InfoWindow();

      var marker, i;

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1] * 1, locations[i][2] * 1),
          map: map
        });
      }
      google.maps.event.addListener(marker, 'click', function (marker, i) {
        return function () {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        };
      }(marker, i));
    }(location, google);
  });
});
'use strict';

angular.module('myApp').directive('searchMap', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/search-map/search-map.html',
    controller: 'searchMapCtrl'
  };
});
'use strict';

angular.module('myApp').service('searchMapService', function ($http, $q) {
  this.getMessage = function () {
    return 'Google map will go here';
  };
  this.getSearchMapLocations = function (arr) {
    var defer = $q.defer();
    $http({
      method: 'post',
      url: '/search/map_locations',
      data: {
        arr: arr
      }
    }).then(function (response) {
      return response.data;
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('signupCtrl', function ($scope, signupService, ngDialog) {
  $scope.registerUser = function (register) {
    if (!register || !register.first_name || !register.last_name || !register.password) {
      alert('Please Fill Out The Required Fields');
    } else if (register.password !== register.confirm_pw) {
      alert('The Passwords Do Not Match');
    } else {
      signupService.registerUser(register).then(function (response) {
        console.log('response from controller', response);
        alert(response);
        $scope.closeThisDialog();
        ngDialog.open({ template: './features/login/login.html', className: 'ngdialog-theme-default', controller: 'loginCtrl' });
      });
    }

    console.log('this is the register obj', register);
  };
  $scope.clickToLogin = function () {
    $scope.closeThisDialog();
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
      defer.resolve(response.data);
    }).catch(function (err) {
      alert(err.data);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('usersProfileDescHeaderCtrl', function ($scope, $stateParams, usersProfileDescHeaderService) {
  var user_id = $stateParams.id;
  usersProfileDescHeaderService.getHostDesc(user_id).then(function (response) {
    $scope.hostDesc = response[0];
    console.log($scope.hostDesc);
  });
});
'use strict';

angular.module('myApp').directive('userProfileDescHeader', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/users-profile-desc-header/users-profile-desc-header.html',
    controller: 'usersProfileDescHeaderCtrl'
  };
});
'use strict';

angular.module('myApp').service('usersProfileDescHeaderService', function ($http, $q) {
  this.getHostDesc = function (user_id) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/users/desc-header/' + user_id
    }).then(function (response) {
      defer.resolve(response.data);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('usersProfileListingsCtrl', function ($scope, $stateParams, userProfileListingsService) {
  var user_id = $stateParams.id;
  userProfileListingsService.getHostListings(user_id).then(function (response) {
    $scope.listings = response;
  });
});
'use strict';

angular.module('myApp').directive('userProfileListings', function () {
  return {
    restrict: 'AE',
    templateUrl: './features/users-profile-listings/users-profile-listings.html',
    controller: 'usersProfileListingsCtrl'
  };
});
'use strict';

angular.module('myApp').service('userProfileListingsService', function ($http, $q) {
  this.getHostListings = function (room_id) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/users/listings/' + room_id
    }).then(function (response) {
      console.log('this is the response in service getHostListings', response.data);
      defer.resolve(response.data);
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('usersProfilePicCtrl', function ($scope, $stateParams, usersProfilePicService) {
  var user_id = $stateParams.id;
  usersProfilePicService.getUsersProfilePic(user_id).then(function (response) {
    console.log('this is response from UsersProfilePicCtrl', response);
    $scope.usersProfilePic = response;
    console.log($scope.usersProfilePic);
  });
});
'use strict';

angular.module('myApp').directive('userProfilePic', function () {
  return {
    restrict: "AE",
    templateUrl: './features/users-profile-pic/users-profile-pic.html',
    controller: 'usersProfilePicCtrl'
  };
});
'use strict';

angular.module('myApp').service('usersProfilePicService', function ($http, $q) {
  this.getUsersProfilePic = function (user_id) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/users/profile-pic/' + user_id
    }).then(function (response) {
      console.log(response.data);
      defer.resolve(response.data);
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

angular.module('myApp').controller('conversationsCtrl', function ($scope, $stateParams, conversationsService) {
  $scope.message = conversationsService.getMessage();
});
'use strict';

angular.module('myApp').service('conversationsService', function ($http, $q) {
  var message = 'This is the conversations page';
  this.getMessage = function () {
    return message;
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
'use strict';

angular.module('myApp').controller('searchCtrl', function ($scope, $stateParams) {
  $scope.messages = 'This is the searchh page';
  $scope.params = $stateParams.search_id;
  console.log($scope.params);
});
'use strict';

angular.module('searchService', function ($http, $q) {});
'use strict';

angular.module('myApp').controller('searchListingsCtrl', function ($scope, $stateParams, searchListingsService, $rootScope) {
  $scope.params = $stateParams.search_id;
  console.log($scope.params);
  // searchlistingsService.getSearchListings function will return listing_images.image_url, rooms.listing_name, rooms.id, limit 2 for now
  //tables needed : listings, listing_images, rooms
  searchListingsService.getSearchListings($scope.params).then(function (response) {
    $rootScope.searchListingsResults = response;
    console.log($scope.searchListingsResults);
  });
  // reference rooms-booking


  // ============================================================================================
  // filter function params whene envoked
  // ============================================================================================
  $scope.otherparams = $stateParams.myParam;
  if ($scope.otherparams) {
    console.log($scope.otherparams);
    // set default values
    var obj = $scope.otherparams;
    obj.searchString = $scope.params;
    searchListingsService.filterSearchListings(obj).then(function (response) {
      $scope.results = response;
      console.log($scope.results);
      $scope.searchListingsResults = $scope.results;
    });
    //search for price in query using 'between' minPrice and maxPrice
    // query home_type = params.hometype;
    // accomodate, bedrooms, and bathrooms all have values hopefully
    // create logic for inputs that are null
    //what will we do with the start and end date ? <=== not sure it will fit in
    // we will change the searchListingsResults when we get back the
  }
});
'use strict';

angular.module('myApp').service('searchListingsService', function ($http, $q, $state) {
  this.getSearchListings = function (string) {
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/search' + '?search=' + string
    }).then(function (response) {
      console.log('response from getSearchListings in service', response.data);
      console.log('this is the response.data.length', response.data.length);
      if (response.data.length < 1) {
        console.log('This is the response length', response.data.length);
        $state.go('error');
      } else {
        defer.resolve(response.data);
      }
    });
    return defer.promise;
  };
  this.filterSearchListings = function (obj) {
    console.log(obj);
    var defer = $q.defer();
    $http({
      method: 'post',
      url: '/search/filter_listings',
      data: obj
    }).then(function (response) {
      console.log('response in searchListingsService filterSearchListings', response.data);

      defer.resolve(response.data);
    });

    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('userRoomsCtrl', function ($scope, $stateParams, $rootScope, userRoomsService) {});
'use strict';

angular.module('myApp').service('userRoomsService', function ($http, $q) {});
'use strict';

angular.module('myApp').controller('userRoomsListingsCtrl', function ($scope, $stateParams, $rootScope, userRoomsListingsService, loginService) {
  loginService.getUser().then(function (user) {
    if (user) {
      $scope.user = user;
      console.log(user);
      userRoomsListingsService.getListingsForView($scope.user.id).then(function (response) {
        $scope.yourlistings = response;
        console.log($scope.yourlistings);
      });
    } else {
      $scope.user = 'NOT LOGGED IN';
    };
  });
});
// select * from listing_images
// join listings on listings.id = listing_images.listing_id
// join rooms on rooms.id = listings.room_id
// where listings.user_id = 6
'use strict';

angular.module('myApp').service('userRoomsListingsService', function ($http, $q, $state) {
  this.getListingsForView = function (user_id) {
    console.log(user_id);
    var defer = $q.defer();
    $http({
      method: 'get',
      url: '/user_rooms/user_listings' + '?user_id=' + user_id
    }).then(function (response) {
      console.log(response.data);
      defer.resolve(response.data);
    }).catch(function (err) {
      state.go('err');
    });
    return defer.promise;
  };
});
'use strict';

angular.module('myApp').controller('usersCtrl', function ($scope, $stateParams, usersService) {
  $scope.message = usersService.getMessage() + 'and this is the $stateParams/Users.Id ' + $stateParams.id;
  console.log('this is $state params', $stateParams.id);
});
'use strict';

angular.module('myApp').service('usersService', function ($http, $q) {
  var message = 'Hello from the Users State';
  this.getMessage = function () {
    return message;
  };
});
'use strict';

angular.module('myApp').controller('usersEditProfileCtrl', function ($scope, $rootScope, $stateParams, loginService, usersEditProfileService) {
  loginService.getUser().then(function (user) {
    if (user) {
      $scope.user = user;
      console.log(user);
    } else {
      $scope.user = 'NOT LOGGED IN';
    };
  });

  // Check user object
  $scope.saveChanges = function (editObj) {
    console.log(editObj);
    if (!editObj) {
      return alert('you need to change something');
    }
    var confirm = prompt('are you sure you want about these changes?', 'yes! I am Positive! Press OK!');
    console.log(confirm);
    if (confirm !== null) {
      // call usersEditProfileService.saveChanges and pass editObj
      usersEditProfileService.saveChanges(editObj).then(function (res) {
        return alert(res);
      });
    }
  };
});
'use strict';

angular.module('myApp').service('usersEditProfileService', function ($http, $q) {
  this.saveChanges = function (userObj) {
    console.log(userObj);
    var defer = $q.defer();
    $http({
      method: 'post',
      url: '/users/profile/edit',
      data: userObj
    }).then(function (response) {
      console.log(response.data);
      defer.resolve(response.data);
    }).catch(function (err) {
      alert(err.data);
    });
    return defer.promise;
  };
});
//# sourceMappingURL=bundle.js.map
