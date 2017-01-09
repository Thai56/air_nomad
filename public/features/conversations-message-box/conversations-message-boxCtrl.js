angular.module('myApp').controller('conversationsMessageBoxCtrl', ($scope,$stateParams,$location,$localStorage,conversationsMessageBoxService,loginService) => {

  const current_user_id = $stateParams.user_id;
  console.log($stateParams.user_id);

  conversationsMessageBoxService.getConversationUsername(current_user_id)
  .then(response => {
    $scope.username = response[0];
    console.log($scope.username);
  })

  loginService.getUser().then(user => {
    if (user){
      $scope.sender = user;
      console.log($scope.sender);
    }
    else  {
        $scope.user = 'NOT LOGGED IN'
    };
    console.log($scope.messagesFromBackend);
  })




  $scope.insertMessage =(user_message) => {
    console.log($scope.user_message,current_user_id);
    let message_time = new Date();
    conversationsMessageBoxService.insertMessage(user_message,current_user_id,message_time).then(response => console.log(response.data))
  }
  // ===================================================================================================================
  // jQuery
  // ==========================================================================================================================================

  jQuery(function($) {
    var socket = io.connect();
    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#chat');

    $messageForm.submit(function(e){
      e.preventDefault();
      socket.emit('send message', $messageBox.val());
      $messageBox.val('')
    })

    socket.on('new message',function(data) {
      console.log('this is the data',data);
      $chat.prepend(
        '<div ng-style=' + '>'
        + '<h4>' + $scope.sender.first_name +'</h4></div><div>' + data + '</div><br>'
      )
    })
    // socket.on('new message',function(data) {
    //   console.log('this is the data',data);
    //   $chat.append(
    //     '<div ng-style=' + '>'
    //     + '<h4>'  + '</h4>' + data + '</div>'
    //   )
    // })
  });
// '"{"width":"100%","background":"white","border-radius":"44px","border-bottom":"1px solid black"}"' +
// + $scope.sender.first_name
// ':' +
// + '<br/>'
  // ==========================================================================================================================================
  conversationsMessageBoxService.getConversation(current_user_id).then(response => {
    console.log(response);
    $scope.messagesFromBackend = response;
    $scope.messagesFromBackend.forEach((obj) => {
      console.log(obj);
      // check reciever id
      if(obj.sender_id === $scope.username.user_id){
        console.log($scope.username.first_name)
        obj.message_name = $scope.username.first_name
      }
      else {
        console.log(obj)
        obj.message_name = $scope.sender.first_name
        console.log(obj);
      }
    })
  })
})
