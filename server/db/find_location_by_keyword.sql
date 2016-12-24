-- select * from rooms where address like '%::$1::%';
-- select * from rooms where address like '2355 fairview pl. Fairfield, CA 94534';
SELECT * FROM rooms WHERE address like '%'|| $1 || '%';
