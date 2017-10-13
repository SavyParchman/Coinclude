SELECT *
FROM users
WHERE first_name = $1
AND last_name = $2;