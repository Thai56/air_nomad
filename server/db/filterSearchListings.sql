select room_accessories.*, listing_images.image_url, rooms.listing_name, rooms.id, rooms.user_id from rooms
join room_accessories on room_accessories.rooms_id = rooms.id
join listings on listings.room_id = room_accessories.rooms_id
join listing_images on listings.id = listing_images.listing_id
where lower(rooms.address) like lower('%'|| $11 || '%')
and room_accessories.tv = $6
and room_accessories.heating = $9
and room_accessories.internet = $8
and room_accessories.ac = $10
and room_accessories.kitchen = $7
and rooms.accomodate = $3
and rooms.bathrooms = $4
and rooms.bedrooms = $5
and room_accessories.nightly_price between $1 and $2;
