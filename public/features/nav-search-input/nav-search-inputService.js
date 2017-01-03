angular.module('myApp').service('navSearchInputService', function($http,$q) {
  this.getMessage = () => {
    return 'Hello from the nav search input service there willl be an input form here to search for nearest cities and maybe states and countries '
  }
})
