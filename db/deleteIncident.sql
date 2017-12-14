delete from incidents 
where id = $1
returning *;