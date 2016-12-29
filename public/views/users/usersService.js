angular.module('myApp').service('usersService', function($http,$q){
  const message = 'Hello from the Users State'
  this.getMessage = () => {
      return message
  }
})
