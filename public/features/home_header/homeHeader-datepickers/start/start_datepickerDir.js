angular.module('myApp').directive('startDatepicker', function(){
  return {
    restrict:'AE',
    templateUrl:'./features/home_header/homeHeader-datepickers/start/start_datepicker.html',
    controller:'start_datepickerCtrl'
  }
})
