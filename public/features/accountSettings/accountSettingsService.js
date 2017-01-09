angular.module('myApp').service('accountSettingsService', function($http,$q) {
  this.deleteAccount = (id) => {
    console.log(id);
    const defer = $q.defer()
    $http({
      method:'delete',
      url:'/account_settings/delete/'+id
    }).then(response => {
      console.log(response.data);
      defer.resolve(response.data)
    })
    return defer.promise
  }
})
