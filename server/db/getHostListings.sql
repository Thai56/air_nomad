select listings.*, listing_images.image_url, rooms.listing_name from rooms
join listings on rooms.id = listings.room_id
join listing_images on listings.id = listing_images.listing_id
where listings.user_id = $1;
