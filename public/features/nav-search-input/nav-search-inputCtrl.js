angular.module('myApp').controller('navSearchInputCtrl', ($scope,$state,$stateParams,navSearchInputService) => {
  $scope.goToSearchState = (search_id) => {
    console.log('search_id',search_id)
    $state.go('search.listings',{search_id:search_id})
  }
})
