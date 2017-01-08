-- // get host_name host_image location_image room_id listing name
select u.first_name as host, ui.image_url as hostImage, r.listing_name as name, li.image_url as main_pic, r.id as room_id from users u
join user_images ui on u.id = ui.user_id
join rooms r on r.user_id = ui.user_id
join listings l on l.room_id = r.id
join listing_images li on li.listing_id = l.id
where r.id = $1 limit 1;
