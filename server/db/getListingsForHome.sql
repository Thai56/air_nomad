select ui.image_url as profile_pic, r.listing_name, r.id as room_id, ri.image_url as room_pic
from users u
join rooms r on u.id = r.user_id
join room_accessories rac on rac.rooms_id = r.id
join room_images ri on ri.room_accessories_id = rac.id
join user_images ui on ri.room_id = ui.room_id
limit 3;
