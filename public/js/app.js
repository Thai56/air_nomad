angular.module('myApp',['ui.router','ngDialog']).config(function($stateProvider,$urlRouterProvider) {
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

  $urlRouterProvider
  .otherwise('/')
});
