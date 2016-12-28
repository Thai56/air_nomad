select reviews.*, user_images.image_url, users.first_name from reviews
join user_images on reviews.user_id = user_images.user_id
join users on users.id = user_images.user_id
where reviews.room_id = $1
order by reviews.id asc;
