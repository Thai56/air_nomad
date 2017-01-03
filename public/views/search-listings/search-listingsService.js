angular.module('myApp').service('searchListingsService', function($http,$q){
  this.getSearchListings = (string) => {
    const defer = $q.defer()
    $http({
      method:'get',
      url:'/search' + '?search=' + string
    })
    .then((response) => {
      console.log('response from getSearchListings in service',response.data);
      defer.resolve(response.data)
    })
    return defer.promise;
  }
  this.filterSearchListings = (obj) => {
    console.log(obj)
    const defer = $q.defer();
    $http({
      method:'post',
      url:'/search/filter_listings',
      data:obj
    }).then(response => {
      console.log('response in searchListingsService filterSearchListings',response.data);
    defer.resolve(response.data)
    })
    return defer.promise
  }
})
