angular.module('myApp').controller('searchMapCtrl', ($scope,$stateParams,searchMapService,$rootScope,$timeout) => {

console.log($stateParams.search_id)
$rootScope.$watch('searchListingsResults', () => {
  console.log('====>',$rootScope.searchListingsResults);
  var searchListingsResults = $rootScope.searchListingsResults;

    // // // // //
    //  * map *  // // // //
    // // // // //
    var locations = []
    for (let i = 0; i < searchListingsResults.length; i++) {
      console.log(searchListingsResults[i]);
      locations.push([searchListingsResults[i].listing_name,searchListingsResults[i].latitude,searchListingsResults[i].longitude])
      console.log(locations);
    }
    var initMap = (function (location,google) {
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: {lat:(searchListingsResults[0].latitude * 1),lng:(searchListingsResults[0].longitude * 1)},
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
          var infowindow = new google.maps.InfoWindow();

          var marker,i;

          for (i = 0;i < locations.length;i++) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng((locations[i][1] * 1), (locations[i][2] * 1)),
              map:map
            });
          }
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));

        }(location,google))

})



})
