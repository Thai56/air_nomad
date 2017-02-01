select * from message where (reciever_id = $1 and sender_id = $2) or
(reciever_id = $2 and sender_id = $1) order by id desc
