angular.module('myApp').controller('roomsListingNearbyCtrl', ($scope,$stateParams,roomsListingNearbyService) => {
  console.log($stateParams.room_id);
  const room_id = $stateParams.room_id;
  roomsListingNearbyService.getRoomThisLocationInfo(room_id).then(response => {
    const current_location = response[0];
    console.log('!!!!!!!!!!CURRENT_LOCATION',current_location);
    var origin1 = {
      lat:(current_location.latitude * 1),
      lng:(current_location.longitude * 1)
    };
    roomsListingNearbyService.getRoomsNearby(room_id,current_location.city).then(response => {

      console.log('RESPONSE.LENGTH',response.length);
      if(response.length  > 0){

        var destinationA = {lat:(response[0].latitude * 1),lng:(response[0].longitude * 1)};
        var destinationB = {lat:(response[1].latitude * 1), lng:(response[1].longitude * 1)};
      $scope.roomsNearby = response;
      console.log("RESPONSE",response[0]);
      var service = new google.maps.DistanceMatrixService();

      var my_distance = service.getDistanceMatrix({
        origins:[origin1],
        destinations:[destinationA,destinationB],
        travelMode:'DRIVING',
        // unitSystem: google.maps.UnitSystem.METRIC
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            console.log(response);
            console.log(response.rows[0].elements[0].distance.text)
            $scope.distance = response.rows[0].elements;
            var myArray = [];
            $scope.distance.forEach(obj => {
              myArray.push(obj.distance.text)
            })
            $scope.roomsNearby[0].dist = myArray[0]
            $scope.roomsNearby[1].dist = myArray[1]
            console.log($scope.roomsNearby);

          }
        })
        // if statement closing bracket below
      }
    })
  })


})
