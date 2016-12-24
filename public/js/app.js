angular.module('myApp',['ui.router','ngDialog','ngAnimate', 'ngSanitize','ui.bootstrap']).config(function($stateProvider,$urlRouterProvider) {
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
