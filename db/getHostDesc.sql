select count(listings.id), users.first_name, users.last_name, users.describe from listings
join users on users.id = listings.user_id
where user_id = $1
group by users.first_name,users.last_name,users.describe
