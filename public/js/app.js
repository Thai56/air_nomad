angular.module('myApp',['ui.router','ui.bootstrap','ngDialog','angular-input-stars']).config(function($stateProvider,$urlRouterProvider) {
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

  $urlRouterProvider
  .otherwise('/')
});
//  dependency of ui-bootstrap carousel from DEMO 'ngSanitize' / ,'ngAnimate'
// Now going to check index.html for any script tags or links that may help carousel
