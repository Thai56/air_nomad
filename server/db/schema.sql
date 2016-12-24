insert into rooms (home_type,room_type,accomodate,bedrooms,bathrooms,listing_name,summary,address,user_id)
values ('apartment','bed and breakfast',3,2,2,'Janes room','Best place on earth','491 s freedom blvd. provo, UT',4)


insert into users (first_name,last_name,is_active,gender,birthday,email,preffered_currency,where_you_live,describe,password)


insert into room_accessories (tv,heating,kitchen,internet,ac,nightly_price,location_id,user_id,is_active,rooms_id)

  select * from users
  join rooms on users.id = rooms.user_id;

  select * from users
join rooms on users.id = rooms.user_id
join room_accessories on room_accessories.rooms_id = rooms.id;

insert into room_images (image_desc,image_url,room_accessories_id,room_id)


  select * from users
  join rooms on users.id = rooms.user_id
  join room_accessories on room_accessories.rooms_id = rooms.id
  join room_images on room_images.room_accessories_id = room_accessories.id;


  select * from users
  join rooms on users.id = rooms.user_id
  join room_accessories on room_accessories.rooms_id = rooms.id
  join room_images on room_images.room_accessories_id = room_accessories.id
  limit 3;
