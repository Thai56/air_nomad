angular.module('myApp').service('homeService', function ($http,$q) {
  const message = 'Hello From the home service';
  this.getMessage = function() {
    return message
  }


})
