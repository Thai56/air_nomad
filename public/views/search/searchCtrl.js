angular.module('myApp').controller('searchCtrl', ($scope,$stateParams) => {
  $scope.messages = 'This is the searchh page'
  $scope.params = $stateParams.search_id;
  console.log($scope.params);
})
