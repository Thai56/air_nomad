angular.module('myApp').service('conversationsMessageBoxService', function($http,$q,$rootScope){
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

  this.insertMessage = (user_message,message_recepient,message_time) => {
    console.log(user_message,message_recepient,message_time);
    const defer = $q.defer();
    $http({
      method:'post',
      url:'/conversations/insert_message',
      data: {
        message_recepient:(message_recepient * 1),
        user_message:user_message,
        message_time:message_time
      }
    })
    .then(response => {
      console.log('response'.response.data);
      defer.resolve(response.data)
    })
    return defer.promise
  }
// ================================================================
// get conversations
// ========================================================================
  this.getConversation = (host_id) => {
    const defer = $q.defer()
     $http({
      method:'get',
      url:'/conversations/messages/' + host_id
    }).then(response => {
      console.log('this is the response . data',response.data);
      defer.resolve(response.data)
    })
    return defer.promise
  }
// ===========================================================================================v==========================
// angular socket.io still trying to make work but too tired at the moment
// ==================================================================================================================================
  //   this.socket = ($rootScope) => {
  //   let socket =io.connect()
  //
  //   return {
  //     on:on,
  //     emit:emit
  //   }
  // //Socket 'on' and 'emit' methods here
  // this.on = (eventName,callBack) => {
  //   socket.on(eventname, () => {
  //     let args = arguments;
  //     $rootScope.$apply(() => {
  //       callback.apply(socket,args);
  //     });
  //   });
  // };
  //
  // this.emit =(eventName,data,callback) => {
  //   socket.emit(evenName,data,() => {
  //     let args = arguments;
  //     $rootScope.$apply(() => {
  //       if(callback){
  //         callback.apply(socket,args);
  //       }
  //     });
  //   });
  // };
  // }
})
