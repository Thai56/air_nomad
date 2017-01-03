angular.module('myApp',['ui.router','ui.bootstrap','ngDialog','angular-input-stars','ngRoute']).config(function($stateProvider,$urlRouterProvider) {
  $stateProvider
  .state('home', {
    url:'/',
    templateUrl:'./views/home/home.html',
    controller:'homeCtrl'
  })
  .state('test', {
    templateUrl:'./views/test.html',
    url:'/test'
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

  $urlRouterProvider
  .otherwise('/')
});
//  dependency of ui-bootstrap carousel from DEMO 'ngSanitize' / ,'ngAnimate'
// Now going to check index.html for any script tags or links that may help carousel
