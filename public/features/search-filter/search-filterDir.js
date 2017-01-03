angular.module('myApp').directive('searchFilter', () => {
  return {
    restrict:'E',
    templateUrl:'./features/search-filter/search-filter.html',
    controller:'searchFilterCtrl'
  }
})
