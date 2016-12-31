select locations.*, listing_images.image_url, rooms.listing_name,rooms.id from rooms
join locations on locations.room_id = rooms.id
join listings on locations.room_id = listings.room_id
join listing_images on listings.id = listing_images.listing_id
where rooms.id != $1
and locations.city = $2
limit 2;
