angular.module('myApp',['ui.router','ui.bootstrap','ngDialog','angular-input-stars','ngRoute','ngStorage']).config(function($stateProvider,$urlRouterProvider,) {
  $stateProvider
  .state('home', {
    url:'/',
    templateUrl:'./views/home/home.html',
    controller:'homeCtrl'
  })
  .state('rooms', {
    url:'/rooms/:room_id',
    controller: 'roomsCtrl',
    templateUrl:'./views/rooms/rooms.html'
  })
  .state('users', {
    url:'/users/:id',
    controller:'usersCtrl',
    templateUrl:'./views/users/users.html'
  })
  .state('conversations', {
    url:'/conversations/:user_id/messages',
    controller:'conversationsCtrl',
    templateUrl:'./views/conversations/conversations.html'
  })
  .state('search', {
    url:'/search',
    controller:'searchCtrl',
    templateUrl:'./views/search/search.html'
  })
  .state('search.listings', {
    templateUrl:'./views/search-listings/search-listings.html',
    url:'/listings/:search_id/',
    controller:'searchListingsCtrl',
    params:{myParam:null}
  })
  .state('user_rooms', {
    url:'/user_rooms',
    templateUrl:'./views/user_rooms/user_rooms.html',
    controller:'userRoomsCtrl'
  })
  .state('user_rooms.user_listings', {
    url:'/user_listings',
    templateUrl:'./views/user_rooms-listings/user_rooms-listings.html',
    controller:'userRoomsListingsCtrl',
    params:{viewParam:null}
  })
  .state('user_rooms.user_reservations', {
    url:'/user_reservations',
    templateUrl:'./views/user_rooms-reservations/user_rooms-reservations.html',
    controller:'userRoomsReservationsCtrl',
    params:{viewParam:null}
  })
  .state('user_rooms.user_trips', {
    url:'/user_trips',
    templateUrl:'./views/user_rooms-trips/user_rooms-trips.html',
    controller:'userRoomsTripsCtrl',
    params:{viewParam:null}
  })
  .state('users_edit_profile', {
    url:'/users/profile/edit',
    templateUrl:'./views/users-edit-profile/users-edit-profile.html',
    params:{viewParam:null},
    controller:'usersEditProfileCtrl'
  })
  .state('error', {
    url:'/error',
    templateUrl:'./views/err/err.html'
  })

  $urlRouterProvider
  .otherwise('/')



});
//  dependency of ui-bootstrap carousel from DEMO 'ngSanitize' / ,'ngAnimate'
// Now going to check index.html for any script tags or links that may help carousel
