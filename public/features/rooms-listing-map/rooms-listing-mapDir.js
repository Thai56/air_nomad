angular.module('myApp').directive('roomListingMap', () => {
  return {
    restrict:'AE',
    templateUrl: './features/rooms-listing-map/rooms-listing-map.html',
    controller: 'roomsListingMapCtrl'
  }
})
