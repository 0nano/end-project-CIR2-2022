SELECT email, lastname, firstname, users.city, picture, age, notation, pc.shape, count(m.id) "nb_matchs" FROM users
                                LEFT JOIN physical_condition pc on pc.id = users.shape_id
                                LEFT JOIN list_player lp on users.email = lp.player
                                LEFT JOIN match m on m.id = lp.id
                                WHERE users.access_token = ':access_token' group by email, pc.shape