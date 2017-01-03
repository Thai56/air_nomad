select listing_images.image_url, rooms.listing_name, rooms.id as room_id,rooms.address as address, rooms.user_id from rooms
join listings on listings.room_id = rooms.id
join listing_images on listings.id = listing_images.listing_id
where lower(rooms.address) like lower('%'|| $1 || '%');
