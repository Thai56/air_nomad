angular.module('myApp').controller('searchMapCtrl', ($scope,$stateParams,searchMapService,$rootScope,$timeout) => {


console.log($stateParams.search_id)
$rootScope.$watch('searchListingsResults', () => {
  console.log('====>',$rootScope.searchListingsResults);
  var searchListingsResults = $rootScope.searchListingsResults;
  searchMapService.getSearchMapLocations(searchListingsResults)
  // // // // //
  //  * map *  // // // //
  // // // // //
  var initMap = (function (google) {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat:-34.397, lng: 150.633},
          disableDefaultUI:false,
          scrollwheel:true,
          mapTypeId:google.maps.MapTypeId.ROADMAP,
          maxZoom:11,
          minZoom:9,
          zoomControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT,
            style: google.maps.ZoomControlStyle.SMALL
          }
        });
        var marker = new google.maps.Marker({
          position: {lat:-25.363,lng: 131.044},
          map: map
        });
      }(google))
 // ==============================================================================================================

})



})
