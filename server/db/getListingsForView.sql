select distinct rooms.*, listing_images.image_url, listings.id as listing_id, room_accessories.* from listing_images
join listings on listings.id = listing_images.listing_id
join rooms on rooms.id = listings.room_id
join room_accessories on rooms.id = room_accessories.rooms_id
where listings.user_id = $1
