select rooms.id as room_id, room_accessories.nightly_price, rooms.listing_name from rooms
join room_accessories on room_accessories.rooms_id = rooms.id where rooms_id =$1;
