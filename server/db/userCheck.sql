select 1 as user_already_exist from users where lower(email) = lower($1)
