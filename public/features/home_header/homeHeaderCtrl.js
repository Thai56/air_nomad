angular.module('myApp').controller('homeHeaderCtrl', function($scope,homeHeaderService){
  $scope.findLocationByKeyword = (keyword) => {
    console.log('keyword from control first', keyword);
    homeHeaderService.findLocationByKeyword(keyword).then(response => {
      console.log(response);
    })
  }
})
