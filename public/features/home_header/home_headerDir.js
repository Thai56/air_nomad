angular.module('myApp').directive('homeHeader',function(){
  return {
    restrict:'AE',
    templateUrl:'./features/home_header/homeHeader.html',
    controller:'homeHeaderCtrl'
  }
})
