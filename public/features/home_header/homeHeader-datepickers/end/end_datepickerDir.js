angular.module('myApp').directive('endDatepicker', function() {
  return {
    restrict:'AE',
    controller:'endDatepickerCtrl',
    templateUrl:'./features/home_header/homeHeader-datepickers/end/end_datepicker.html',
    require:'ngModel',
    link: function(scope,elem,attr,ngModelCtrl) {
      elem.on('click', ()=>console.log(ngModelCtrl))
    }
  }
})
