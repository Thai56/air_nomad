select distinct user_images.image_url, users.first_name, users.last_name, users.id as user_id, rooms.id as room_id,
listings.id as listing_id
from users
left join user_images on users.id = user_images.user_id
left join rooms on rooms.id = user_images.room_id
left join listings on listings.room_id = rooms.id
where users.id = $1 limit 1;
