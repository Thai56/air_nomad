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

  select room_accessories.*,rooms.summary from room_accessories
join rooms on rooms.id = room_accessories.rooms_id
where room_accessories.rooms_id = 5

insert into room_images (room_id,image_desc,image_url,room_accessories_id)
values (4,'dining area','room_images/tokyo_japan.jpg',1)

update room_images set image_url='room_images/tokyo_japan1.jpg' where id = 4

  create table user_images (
    id serial primary key,
    user_id integer,
    room_id integer,
    image_url varchar(120)
    )

    select user_images.image_url, users.first_name, users.last_name from users
    join user_images on users.id = user_images.user_id where user_images.room_id = 6

    insert into listings (room_accessories_id,room_id,user_id)
    values (3,6,8)

    -- may need to remake this table after tests *deletion*
    create table reservations (
    	id serial primary key,
        user_id int,
        room_id int,
        room_accessories_id int,
        start_date varchar(15),
        end_date varchar(15)
    )
    -- -- -- -- -- -- -- -- --  * deletion *

    select * from reservations join
room_accessories on  room_accessories.rooms_id = reservations.room_id
join users on room_accessories.user_id = users.id
-- just incase we need to create this table again
create table locations(
    id serial primary key,
    city varchar(80),
    state varchar(25),
    country varchar(50),
    longitude decimal(9,6),
    lattitude decimal(9,6),
    room_id int
    )
-- * this may need to have a limit but maybe not since it has a room_id so no * --
    select * from locations where room_id = $1;

-- need this for setup with getReviews
select reviews.*, user_images.image_url from reviews
join user_images on reviews.user_id = user_images.user_id



select reviews.*, user_images.image_url,users.first_name from reviews
join user_images on reviews.user_id = user_images.user_id
join users on users.id = user_images.user_id
where reviews.room_id = 5
order by reviews.id asc

-- Can probably narrow this down by taking off distinct --
select distinct on (rooms.listing_name)room_images.image_url, rooms.listing_name, room_images.room_id from room_images
join rooms on room_images.room_id = rooms.id
join listings on listings.room_id = rooms.id
where rooms.user_id = 6
and room_images.id < 4

-- this is the edit of the one above ^ because we would need to get the top room_images.image url as a picture
select rooms.listing_name,room_images.image_url,rooms.id  from rooms
join room_images on rooms.id = room_images.room_id
where rooms.user_id = 8
order by room_images.id
limit 1


select * from listings
join listing_images on listings.id = listing_images.listing_id
where listings.user_id = 8

-- last solution to the query problem i've been having all morning
select listings.*, listing_images.image_url, rooms.listing_name from rooms
join listings on rooms.id = listings.room_id
join listing_images on listings.id = listing_images.listing_id
where listings.user_id = 6


select users.first_name,users.last_name,user_images.image_url,user_images.room_id from user_images
join users on users.id = user_images.user_id where user_images.user_id = 7

select * from locations where room_id != 4 and locations.city = 'Fairfield' limit 3

select locations.*, listing_images.image_url, rooms.listing_name,rooms.id from rooms
join locations on locations.room_id = rooms.id
join listings on locations.room_id = listings.room_id
join listing_images on listings.id = listing_images.listing_id
where rooms.id != 8
and locations.city = 'Seattle';


select listing_images.image_url, rooms.listing_name, rooms.id, rooms.user_id from rooms
join listings on listings.room_id = rooms.id
join listing_images on listings.id = listing_images.listing_id
where lower(rooms.address) like lower('%'|| 'Fairfield' || '%');


    select room_accessories.*, listing_images.image_url, rooms.listing_name, rooms.id, rooms.user_id from rooms
join room_accessories on room_accessories.rooms_id = rooms.id
join listings on listings.room_id = room_accessories.rooms_id
join listing_images on listings.id = listing_images.listing_id
where lower(rooms.address) like lower('%'|| 'Fairfield' || '%')
	and room_accessories.tv = false
    and room_accessories.heating = true
    and room_accessories.internet = false
    and room_accessories.ac = true
    and room_accessories.kitchen = false
    and rooms.accomodate = 1
    and rooms.bathrooms = 2
    and rooms.bedrooms = 1
    and room_accessories.nightly_price between 0 and 1000;
