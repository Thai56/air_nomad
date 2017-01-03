angular.module('myApp').directive('navbarDropdown', () => {
  return {
    restrict:'AE',
    templateUrl:'./features/navbar-dropdown/navbar-dropdown.html',
    controller:'navbarDropdownCtrl'
  }
})
