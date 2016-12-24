select * from users
join rooms on users.id = rooms.user_id
join room_accessories on room_accessories.rooms_id = rooms.id
join room_images on room_images.room_accessories_id = room_accessories.id
limit 3;
