select room_accessories.*, rooms.summary from room_accessories
join rooms on rooms.id = room_accessories.rooms_id
where room_accessories.rooms_id = $1;
