angular.module('myApp').service('homeHeaderService', function($http, $q){
  this.findLocationByKeyword = (keyword) => {
    const defer = $q.defer();
    console.log('service call first',keyword.location);
    $http({
      method:"get",
      url:'rooms/search/' + keyword.location
    }).then((response)=> {
      console.log(response)
      defer.resolve(response)
    })
    return defer.promise
  }
})
