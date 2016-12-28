angular.module('myApp').controller('roomsListingMapCtrl', ($scope,$stateParams,roomsListingMapService) => {

  (function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }())
})

// $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLai2ASGmpS4sDCyIDXV18_rtWHz1V-eo";
// NgMap.getMap().then(function(map) {
//   console.log(map.getCenter());
//   console.log('markers', map.markers);
//   console.log('shapes', map.shapes);
// });
