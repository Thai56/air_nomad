angular.module('myApp').controller('conversationsMessageBoxCtrl', ($scope,$stateParams,$location,$localStorage,conversationsMessageBoxService,loginService) => {

var socket = io.connect();

socket.on('connect', function() {
  socket.emit('addUser', prompt('What\'s your name?'))
  })

  $(function() {
    $('#datasend').click(function(){
      var message = $('#data').val();
      $('#data').val('');
      $('$data').focus();

      socket.emit('sendChat', message);
    })
    $('#data').keypress(function(e) {
      if(e.which == 13){
        $(this).blur();

        $('#datasend').focus().click();
        $('#data').focus();
      }
    })
  })
})
