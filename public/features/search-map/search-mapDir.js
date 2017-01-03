angular.module('myApp').directive('searchMap', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/search-map/search-map.html',
    controller:'searchMapCtrl'
  }
})
