angular.module('myApp').service('conversationsProfilePicService', function($http,$q) {
  this.getConversationProfilePic = (user_id) => {
    const defer = $q.defer()
    $http({
      method:'get',
      url:'/conversations/profile-pic/'+user_id
    }).then(response => {
      console.log('this is the resposne.data',response.data);
      defer.resolve(response.data)
    })
    return defer.promise
  }
})
