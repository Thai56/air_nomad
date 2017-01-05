angular.module('myApp').service('searchListingsService', function($http,$q,$state){
  this.getSearchListings = (string) => {
    const defer = $q.defer()
    $http({
      method:'get',
      url:'/search' + '?search=' + string
    })
    .then((response) => {
      console.log('response from getSearchListings in service',response.data);
      console.log('this is the response.data.length',response.data.length);
      if(response.data.length < 1) {
        console.log('This is the response length',response.data.length);
        $state.go('error')
      }
      else {
        defer.resolve(response.data)
      }
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
