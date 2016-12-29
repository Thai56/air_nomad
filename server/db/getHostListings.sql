select rooms.listing_name,room_images.image_url,rooms.id  from rooms
join room_images on rooms.id = room_images.room_id
where rooms.user_id = $1
order by room_images.id
limit 1
