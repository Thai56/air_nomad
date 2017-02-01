select rooms.listing_name, rooms.address, rooms.home_type, rooms.accomodate, rooms.bedrooms, rooms.bathrooms
from rooms where id = $1;
