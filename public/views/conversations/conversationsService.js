angular.module('myApp').service('conversationsService', function($http,$q) {
  const message = 'This is the conversations page';
  this.getMessage = () => {
    return message
  }
})
