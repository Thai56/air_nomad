angular.module('myApp').controller('conversationsMessageBoxCtrl', ($scope,$stateParams,conversationsMessageBoxService) => {
  const user_id = $stateParams.user_id;
  conversationsMessageBoxService.getConversationUsername(user_id)
  .then(response => {
    $scope.username = response[0];
  })
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
    $chat.append(data + '<br/>')
  })
});
// ==========================================================================================================================================
})
