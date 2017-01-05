select message.* , users.first_name as reciever_first_name
      , users.last_name as reciever_last_name from message join users
  on users.id = message.reciever_id
   where message.sender_id = $2  or message.sender_id = $1
    and message.reciever_id = $1 or message.reciever_id  = $2
    order by message.id desc;
