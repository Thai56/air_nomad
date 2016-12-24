angular.module('myApp').controller('roomsListingCarouselCtrl', ($scope,$stateParams,roomsListingCarouselService) => {
  $scope.message = roomsListingCarouselService.getMessage()
  const room_id = $stateParams.room_id;
  roomsListingCarouselService.getCarouselImages(room_id).then(response => {
    $scope.slides = [];
    console.log('resonse that is back from the carousel endpoint', response)
    $scope.obj = response[0]
    console.log('this is object from controller',$scope.obj);
    console.log('this is the image_url',$scope.obj.image_url)
    $scope.slides.push({
      image:'../../'+$scope.obj.image_url,
      type:'room_images',
      text:$scope.obj.image_desc
    })
    console.log('thiss is the scope slides within controller', $scope.slides);
  })


// // // //
// Test
// // // //

$scope.myInterval = 3000;
  // $scope.slides = [

    // ,
    // {
    //   image:'../../IMG/caps/teepers-cap_back_blackred-color-white.jpg',
    //   type:'caps',
    //   text:'Caps'
    // },
    // {
    //   image:'../../IMG/sweaters/naksweat-black-yellow.jpg',
    //   type:'sweaters',
    //   text:'Hoodies'
    // },
    // {
    //   image:'../../IMG/shorts/nakshorts-black-gold.jpg',
    //   type:'shorts',
    //   text:'Thai Shorts'
    // }
    // ]


})
// // // //

// // // //
