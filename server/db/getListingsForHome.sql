select *, user_images.image_url as profile_pic, room_images.image_url as room_pic from users
join rooms on users.id = rooms.user_id
join room_accessories on room_accessories.rooms_id = rooms.id
join room_images on room_images.room_accessories_id = room_accessories.id
join user_images on room_images.room_id = user_images.room_id
limit 3;
