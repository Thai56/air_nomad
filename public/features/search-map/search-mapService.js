angular.module('myApp').service('searchMapService', function($http,$q) {
  this.getMessage = () => {
    return 'Google map will go here'
  }
  this.getSearchMapLocations = (arr) => {
    const defer = $q.defer();
    $http({
      method:'post',
      url:'/search/map_locations',
      data: {
        arr:arr
      }
    }).then(response => {
      return response.data
    })
    return defer.promise
  }
})
