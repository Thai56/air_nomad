angular.module('myApp').controller('searchListingsCtrl', ($scope,$stateParams,searchListingsService,$rootScope)=> {
  $scope.params = $stateParams.search_id
  console.log($scope.params);
// searchlistingsService.getSearchListings function will return listing_images.image_url, rooms.listing_name, rooms.id, limit 2 for now
//tables needed : listings, listing_images, rooms
  searchListingsService.getSearchListings($scope.params)
    .then(response => {
      $rootScope.searchListingsResults = response;
      console.log($scope.searchListingsResults);
      
    })
// reference rooms-booking



// ============================================================================================
// filter function params whene envoked
// ============================================================================================
  $scope.otherparams = $stateParams.myParam;
  if($scope.otherparams){
    console.log($scope.otherparams);
    // set default values
    var obj = $scope.otherparams;
    obj.searchString = $scope.params;
    searchListingsService.filterSearchListings(obj).then(response => {
      $scope.results = response;
      console.log($scope.results);
      $scope.searchListingsResults = $scope.results

    })
    //search for price in query using 'between' minPrice and maxPrice
    // query home_type = params.hometype;
    // accomodate, bedrooms, and bathrooms all have values hopefully
    // create logic for inputs that are null
    //what will we do with the start and end date ? <=== not sure it will fit in
    // we will change the searchListingsResults when we get back the
  }

})
