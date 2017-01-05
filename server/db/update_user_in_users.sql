update users
	set first_name = $1,
    	last_name = $2,
        email = $3,
        gender = $4,
        where_you_live= $5,
        preffered_currency= $6,
        password= $7
    where id = $8
