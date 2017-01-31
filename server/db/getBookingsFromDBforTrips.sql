select res.*,r.listing_name from reservations res
join rooms r on r.id = res.room_id where res.user_id = $1;
