angular.module('myApp').service('conversationsMessageBoxService', function($http,$q){
  this.getConversationUsername = (user_id) => {
    const defer = $q.defer();
    $http({
      method:'get',
      url:'conversations/username/'+ user_id
    })
    .then(response => {
      defer.resolve(response.data)
    })
    return defer.promise
  }
})
