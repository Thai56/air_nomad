angular.module('myApp').directive('navSearchInput', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/nav-search-input/nav-search-input.html',
    controller:'navSearchInputCtrl'
  }
})
