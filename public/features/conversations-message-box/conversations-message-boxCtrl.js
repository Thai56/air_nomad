angular.module('myApp').controller('conversationsMessageBoxCtrl', ($scope,$stateParams,$location,$localStorage,conversationsMessageBoxService,loginService) => {

  const current_user_id = $stateParams.user_id;
  console.log($stateParams.user_id);
  conversationsMessageBoxService.getConversation(current_user_id).then(response => {
    console.log(response);
    $scope.messagesFromBackend = response;
  })

  conversationsMessageBoxService.getConversationUsername(current_user_id)
  .then(response => {
    $scope.username = response[0];
  })

  loginService.getUser().then(user => {
    if (user){
      $scope.sender = user;
      console.log($scope.sender);
    }
    else  {
        $scope.user = 'NOT LOGGED IN'
    };
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
      $chat.append(
        '<div ng-style=' + '"{"width":"100%","background":"white","border-radius":"44px","border-bottom":"1px solid black"}"' + '>'
        + '<h4>' + $scope.sender.first_name + ':' + '</h4>' + data + '</div>' + '<br/>'
      )
    })
  });

  // ==========================================================================================================================================

})
