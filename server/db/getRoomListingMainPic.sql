select room_images.image_url,users.first_name as first_name, users.last_name as last_name from room_images
join rooms on rooms.id = room_images.room_id
join users on users.id= rooms.user_id where room_id = $1 limit 1;
