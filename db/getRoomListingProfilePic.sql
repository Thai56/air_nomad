select user_images.image_url, users.first_name, users.last_name, users.id from users
join user_images on users.id = user_images.user_id where user_images.room_id = $1
