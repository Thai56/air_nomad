select users.first_name,users.last_name,user_images.image_url,user_images.user_id from user_images
join users on users.id = user_images.user_id where user_images.user_id = $1
limit 1;
