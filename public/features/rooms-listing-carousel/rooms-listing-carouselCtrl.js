angular.module('myApp').controller('roomsListingCarouselCtrl', ($scope, $stateParams, roomsListingCarouselService) => {
// ==========================================================================================
// variables
// ============================================================================================================
  const room_id = $stateParams.room_id;

// ============================================================================================================
// carousel
// ============================================================================================================
    roomsListingCarouselService.getCarouselImages(room_id).then(response => {
      $scope.myInterval = 3000;
      $scope.slides = [];
        console.log('resonse that is back from the carousel endpoint', response)

        $scope.image_Array = response;

        for (var i = 0, j = $scope.image_Array.length; i < j; i++) {
            $scope.slides.push({
                image: '../../' + $scope.image_Array[i].image_url,
                type: 'room images',
                text: $scope.image_Array[i].image_desc
            })
        }
        console.log('thiss is the scope slides within controller', $scope.slides);
    })


})

// // // //
// Test
// // // //

// $scope.slides.push({
//   image:'../../'+$scope.obj.image_url,
//   type:'room_images',
//   text:$scope.obj.image_desc
// })


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
