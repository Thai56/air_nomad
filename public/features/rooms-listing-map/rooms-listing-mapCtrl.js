angular.module('myApp').controller('roomsListingMapCtrl', ($scope,$stateParams,roomsListingMapService) => {
const room_id = $stateParams.room_id;
// =====================================================================================================
// START OF FUNCTION
// ==============================================================================================================
roomsListingMapService.getRoomListingCoordinates(room_id).then(response => {
  console.log('this is the locations object',response[0]);
  $scope.location = response[0];
  console.log('scope locaitons',$scope.location);
  $scope.coordinates = {lat:($scope.location.latitude * 1),lng:($scope.location.longitude * 1)}
  console.log('here are the scope coordinates =======>',$scope.coordinates);

  // // // // //
//  * map *  // // // //
// // // // //
 var coordinates = $scope.coordinates;
 console.log('OUTSIDE OF COORDINTATES!!!' , $scope.coordinates);
 var initMap = (function (coordinates,google) {
       console.log('******within IIFE',coordinates);
       var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 10,
         center: coordinates,
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
         position: coordinates,
         map: map
       });
     }(coordinates,google))
// ==============================================================================================================
})





})
