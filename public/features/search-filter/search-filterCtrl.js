angular.module('myApp').controller('searchFilterCtrl', ($scope,$stateParams,$filter,$state,searchFilterService) => {
  $scope.message = searchFilterService.getMessage()
  $scope.search_filter = {
    startDate:null,
    endDate:null,
    minPrice:0,
    maxPrice:1000,
    room_type: {
      entire:false,
      private:false,
      shared:false
    },
    tv:false,
    kitchen:false,
    internet:false,
    heating:false,
    ac:false
  }
// ================================================================================================
// accommodate select input
// ================================================================================================
  $scope.accommodate = [{
    id:1,
    label:1,
    value:1
  },
  {
    id:2,
    label:2,
    value:2
  },
  {
    id:3,
    label:3,
    value:3
  },
  {
    id:4,
    label:4,
    value:4
  }]

  $scope.selectAcc = $scope.accommodate[0]
// ================================================================================================
// bedrooms select input
// ================================================================================================
  $scope.bedrooms = [{
    id:1,
    label:1,
    value:1
  },
  {
    id:2,
    label:2,
    value:2
  },
  {
    id:3,
    label:3,
    value:3
  },
  {
    id:4,
    label:4,
    value:4
  },
  {
    id:5,
    label:5,
    value:5
  }]

  $scope.selectBed = $scope.bedrooms[0]
// ================================================================================================
// bathrooms select input
// ================================================================================================
  $scope.bathrooms = [{
    id:1,
    label:1,
    value:1
  },
  {
    id:2,
    label:2,
    value:2
  },
  {
    id:3,
    label:3,
    value:3
  },
  {
    id:4,
    label:4,
    value:4
  },
  {
    id:5,
    label:5,
    value:5
  }]

  $scope.selectBath = $scope.bathrooms[0]

// ================================================================================================
// search-filter-btn function need to filter through the dates in the search_obj and set logic for null/undefined values
// ================================================================================================
  $scope.searchFilter = (search_obj,acc,bed,bath) => {
    if(!search_obj){
      search_obj = {}
    }
    // set a label of 'select' for accommodate, bedrooms, bathrooms
    search_obj.acc=acc.value;
    search_obj.bed=bed.value;
    search_obj.bath=bath.value;
    // filter the search_obj.startDate & search_obj.endDate reference bookingCtrl
    // search_obj.startDate = $filter('date')($scope.search_filter.startDate,'shortDate')
    // search_obj.endDate = $filter('date')($scope.search_filter.endDate,'shortDate')

    // for(var k in search_obj.room_type) {
    //   if(search_obj.room_type[k] !== false){
    //     console.log(search_obj.room_type[k]);
    //     if(k === 'entire' && search_obj.room_type.entire === true){
    //       $scope.room_type[k] = 'entire'
    //     }
    //     if(k === 'shared' && search_obj.room_type.shared === true){
    //       $scope.room_type[k] = 'shared'
    //     }
    //     if(k === 'private' && search_obj.room_type.private === true){
    //       $scope.room_type[k] = 'private'
    //     }
    //   }
    //   console.log('these are the room types',search_obj.room_type);
    // }
    $state.go('search.listings', {myParam:search_obj})
  }





})
