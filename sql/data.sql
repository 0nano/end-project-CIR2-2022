/*******************************************************************************
Create Date:    2022-06-15
Author:         Clément Jaminion
Author:         Maxence Laurent
Description:    Populates the tables of the database.
Usage:          psql -U postgres -d db_fysm -a -f data.sql
                https://stackoverflow.com/a/23992045/12619942
*******************************************************************************/

DELETE FROM match;
DELETE FROM sport;
DELETE FROM physical_condition;
DELETE FROM users;

ALTER SEQUENCE physical_condition_id_seq RESTART;
INSERT INTO physical_condition (shape) VALUES
('jamais'), ('assez souvent (1 à 5 fois par mois)'),
('souvent (6 à 10 fois par mois)'),
('très souvent (4 ou 5 fois par semaine)'), 
('tous les jours');

INSERT INTO users (email,firstname,lastname,age,city,picture,pwd_hash,shape_id) VALUES
  ('test@test.com', 'test', 'test', 20, 44109, 'img/profil.svg', '$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('dictum.proin@google.org','Hop','Bonner',44,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('vivamus.molestie@yahoo.org','John','Heath',38,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('feugiat.metus.sit@aol.com','Myles','Montoya',48,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('nisi.sem@aol.couk','Zane','Sherman',14,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('orci.donec@icloud.com','Virginia','Harper',22,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('diam@protonmail.org','Leilani','Matthews',50,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('cursus.nunc.mauris@outlook.couk','Alyssa','Sellers',31,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('mauris.magna@outlook.org','Adrian','Lowery',13,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('aliquam.tincidunt@icloud.edu','Valentine','Casey',38,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('dui.suspendisse@icloud.edu','Hammett','Mejia',42,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('sed.eu.nibh@aol.org','Aaron','Montgomery',33,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('mollis@hotmail.edu','Iona','Kelly',36,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('porttitor.eros@aol.edu','Lyle','Dillon',44,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('suspendisse@google.edu','Vera','Conley',19,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('orci@outlook.couk','Clementine','Jarvis',31,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('mattis.cras@yahoo.org','Sylvester','Turner',50,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('orci@yahoo.ca','Hanae','Hines',21,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('phasellus@outlook.ca','Bruno','Shannon',15,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('augue.malesuada@google.org','Virginia','Thornton',30,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('lobortis@outlook.edu','Nadine','Doyle',36,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('vitae@outlook.couk','Joan','Mcknight',49,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('amet.diam@icloud.ca','Fuller','Frank',50,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('ridiculus.mus@aol.edu','Malcolm','Wagner',48,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('curae.phasellus.ornare@yahoo.couk','Rafael','Mcmillan',40,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('adipiscing.lobortis@yahoo.com','Kellie','Price',15,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('integer.in@yahoo.com','McKenzie','Meadows',19,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('adipiscing.elit@google.net','Griffin','Cotton',16,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('ipsum.donec@aol.com','Mohammad','Stevenson',33,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('congue@hotmail.ca','Cyrus','Dillon',39,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('tellus.id@google.org','Ivan','Trevino',27,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('ut.nec@hotmail.couk','Judah','Robinson',23,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('scelerisque.sed.sapien@google.org','Kirestin','Baird',18,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('magna.praesent@protonmail.couk','Garrison','Sims',27,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('ut@google.com','Tad','Deleon',25,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('dolor.tempus@outlook.com','Gage','Munoz',31,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('ornare.libero@aol.ca','Kermit','Wheeler',30,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('iaculis@protonmail.com','Doris','Young',13,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('ac.mi.eleifend@aol.couk','Odette','Rocha',32,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('eu.ligula@icloud.net','Kaseem','Workman',27,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('nisi@aol.edu','Maryam','Clay',14,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('cum.sociis.natoque@aol.net','Aidan','Mcknight',39,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('convallis.est.vitae@hotmail.edu','Keefe','Mcneil',41,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('erat.vivamus.nisi@icloud.net','Yuli','Duke',50,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('curabitur.egestas.nunc@aol.edu','Brynne','Morton',28,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('est@yahoo.net','Raja','Hunt',27,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('sed@outlook.net','Barry','Stephenson',14,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('velit.dui@icloud.couk','Charlotte','Suarez',38,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('dui@protonmail.net','Lisandra','Serrano',38,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('luctus.lobortis@hotmail.edu','Basil','Hicks',18,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
  ('vitae@aol.ca','Steven','Salas',42,44109,'img/profil.svg','$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2);

ALTER SEQUENCE sport_id_seq RESTART;
INSERT INTO sport (sport_name) VALUES
('Rugby'), ('Natation'), ('Football'), ('Basketball'), ('Ultimate'), ('Cyclisme'), ('Badminton'), ('Volley');

ALTER SEQUENCE match_id_seq RESTART;
INSERT INTO match (city_address,city,organizer,min_player,max_player,best_player,date_event,duration,id_sport) VALUES
  ('5, rue André-Tardieu',44109,'dui.suspendisse@icloud.edu',6,30,'ridiculus.mus@aol.edu','2021-06-01 07:25:38','14:21:28',6),
  ('5, rue André-Tardieu',44109,'dictum.proin@google.org',6,30,'ridiculus.mus@aol.edu','2021-06-24 21:47:11','20:57:15',6),
  ('5, rue André-Tardieu',44109,'amet.diam@icloud.ca',6,30,'test@test.com','2021-08-23 19:32:11','21:25:56',8),
  ('5, rue André-Tardieu',44109,'phasellus@outlook.ca',6,30,'test@test.com','2021-05-14 18:16:12','15:02:37',4),
  ('5, rue André-Tardieu',44109,'nisi.sem@aol.couk',6,30,'orci.donec@icloud.com','2021-05-05 08:27:37','21:22:35',5),
  ('5, rue André-Tardieu',44109,'orci@outlook.couk',6,30,'test@test.com','2021-06-24 22:17:48','14:12:20',3),
  ('5, rue André-Tardieu',44109,'curae.phasellus.ornare@yahoo.couk',6,30,'ridiculus.mus@aol.edu','2021-05-15 18:42:55','18:56:44',4),
  ('5, rue André-Tardieu',44109,'orci@yahoo.ca',6,30,'ornare.libero@aol.ca','2021-07-27 04:06:02','17:12:26',6),
  ('5, rue André-Tardieu',44109,'orci@yahoo.ca',6,30,'ornare.libero@aol.ca','2021-07-08 02:41:39','18:42:31',5),
  ('5, rue André-Tardieu',44109,'amet.diam@icloud.ca',6,30,'test@test.com','2021-08-20 12:58:19','15:07:04',5),
  ('5, rue André-Tardieu',44109,'adipiscing.lobortis@yahoo.com',6,30,'test@test.com','2021-07-24 19:33:57','17:08:49',3),
  ('5, rue André-Tardieu',44109,'augue.malesuada@google.org',6,30,'diam@protonmail.org','2021-06-10 15:02:25','19:09:21',1),
  ('5, rue André-Tardieu',44109,'sed.eu.nibh@aol.org',6,30,'diam@protonmail.org','2021-08-19 10:36:46','15:06:32',2),
  ('5, rue André-Tardieu',44109,'dui.suspendisse@icloud.edu',6,30,'diam@protonmail.org','2021-06-24 12:43:44','16:30:04',2),
  ('5, rue André-Tardieu',44109,'adipiscing.lobortis@yahoo.com',6,30,'orci.donec@icloud.com','2021-08-28 18:19:33','18:14:58',7),
  ('5, rue André-Tardieu',44109,'nisi.sem@aol.couk',6,30,'ridiculus.mus@aol.edu','2021-07-23 04:59:28','17:26:22',5),
  ('5, rue André-Tardieu',44109,'suspendisse@google.edu',6,30,'ridiculus.mus@aol.edu','2021-08-19 10:34:19','21:20:28',8),
  ('5, rue André-Tardieu',44109,'amet.diam@icloud.ca',6,30,'diam@protonmail.org','2021-06-04 04:44:14','20:26:04',3),
  ('5, rue André-Tardieu',44109,'amet.diam@icloud.ca',6,30,'ornare.libero@aol.ca','2021-05-23 09:03:39','17:00:59',3),
  ('5, rue André-Tardieu',44109,'lobortis@outlook.edu',6,30,'ridiculus.mus@aol.edu','2021-06-20 00:14:24','20:38:17',6),
  ('5, rue André-Tardieu',44109,'augue.malesuada@google.org',6,30,'ornare.libero@aol.ca','2021-08-02 06:38:53','20:57:04',2),
  ('5, rue André-Tardieu',44109,'porttitor.eros@aol.edu',6,30,'diam@protonmail.org','2021-08-31 01:18:27','14:37:03',8),
  ('5, rue André-Tardieu',44109,'mauris.magna@outlook.org',6,30,'test@test.com','2021-07-27 10:35:39','17:31:01',4),
  ('5, rue André-Tardieu',44109,'phasellus@outlook.ca',6,30,'ornare.libero@aol.ca','2021-07-03 00:24:04','14:09:15',7),
  ('5, rue André-Tardieu',44109,'adipiscing.lobortis@yahoo.com',6,30,'orci.donec@icloud.com','2021-06-05 12:49:17','21:49:05',4),
  ('5, rue André-Tardieu',44109,'mattis.cras@yahoo.org',6,30,'orci.donec@icloud.com','2021-08-02 17:44:26','21:40:20',5),
  ('5, rue André-Tardieu',44109,'phasellus@outlook.ca',6,30,'test@test.com','2021-05-22 17:18:32','16:07:31',2),
  ('5, rue André-Tardieu',44109,'orci@outlook.couk',6,30,'orci.donec@icloud.com','2021-05-19 08:59:24','14:20:58',8),
  ('5, rue André-Tardieu',44109,'phasellus@outlook.ca',6,30,'ridiculus.mus@aol.edu','2021-06-30 18:51:07','21:57:52',3),
  ('5, rue André-Tardieu',44109,'curae.phasellus.ornare@yahoo.couk',6,30,'test@test.com','2021-06-19 18:34:02','18:33:41',4),
  ('5, rue André-Tardieu',44109,'amet.diam@icloud.ca',6,30,'ornare.libero@aol.ca','2021-06-16 12:28:58','20:07:06',2),
  ('5, rue André-Tardieu',44109,'sed.eu.nibh@aol.org',6,30,'test@test.com','2021-07-16 20:28:13','19:47:58',4),
  ('5, rue André-Tardieu',44109,'diam@protonmail.org',6,30,'test@test.com','2021-07-08 12:57:46','18:33:54',4),
  ('5, rue André-Tardieu',44109,'diam@protonmail.org',6,30,'ridiculus.mus@aol.edu','2021-06-15 17:21:14','14:51:09',2),
  ('5, rue André-Tardieu',44109,'vitae@outlook.couk',6,30,'ornare.libero@aol.ca','2021-06-30 18:13:53','21:03:40',7),
  ('5, rue André-Tardieu',44109,'test@test.com',6,30,'ridiculus.mus@aol.edu','2021-05-15 15:17:29','19:33:12',4),
  ('5, rue André-Tardieu',44109,'mattis.cras@yahoo.org',6,30,'ornare.libero@aol.ca','2021-06-25 16:09:19','17:36:58',4),
  ('5, rue André-Tardieu',44109,'dui.suspendisse@icloud.edu',6,30,'diam@protonmail.org','2021-07-05 15:09:47','19:09:21',5),
  ('5, rue André-Tardieu',44109,'orci@outlook.couk',6,30,'ridiculus.mus@aol.edu','2021-07-20 11:55:32','16:14:46',6),
  ('5, rue André-Tardieu',44109,'cursus.nunc.mauris@outlook.couk',6,30,'ornare.libero@aol.ca','2021-06-29 05:32:03','14:16:18',3); 

INSERT INTO list_player (id,states,player) VALUES
  (7,0,'mauris.magna@outlook.org'),
  (6,0,'diam@protonmail.org'),
  (7,0,'ridiculus.mus@aol.edu'),
  (7,0,'augue.malesuada@google.org'),
  (18,0,'adipiscing.lobortis@yahoo.com'),
  (17,0,'nisi.sem@aol.couk'),
  (9,0,'vivamus.molestie@yahoo.org'),
  (2,0,'ridiculus.mus@aol.edu'),
  (9,0,'ridiculus.mus@aol.edu'),
  (15,0,'phasellus@outlook.ca'),
  (14,0,'mollis@hotmail.edu'),
  (7,0,'amet.diam@icloud.ca'),
  (5,0,'sed.eu.nibh@aol.org'),
  (9,0,'diam@protonmail.org'),
  (15,0,'diam@protonmail.org'),
  (4,0,'integer.in@yahoo.com'),
  (11,0,'vitae@outlook.couk'),
  (9,0,'test@test.com'),
  (11,0,'mattis.cras@yahoo.org'),
  (11,0,'amet.diam@icloud.ca'),
  (19,0,'sed.eu.nibh@aol.org'),
  (9,0,'porttitor.eros@aol.edu'),
  (9,0,'feugiat.metus.sit@aol.com'),
  (12,0,'aliquam.tincidunt@icloud.edu'),
  (5,0,'feugiat.metus.sit@aol.com'),
  (5,0,'ridiculus.mus@aol.edu'),
  (5,0,'mollis@hotmail.edu'),
  (2,0,'diam@protonmail.org'),
  (12,0,'ridiculus.mus@aol.edu'),
  (3,0,'mauris.magna@outlook.org'),
  (12,0,'augue.malesuada@google.org'),
  (18,0,'vivamus.molestie@yahoo.org'),
  (15,0,'amet.diam@icloud.ca'),
  (16,0,'ridiculus.mus@aol.edu'),
  (12,0,'cursus.nunc.mauris@outlook.couk'),
  (12,0,'integer.in@yahoo.com'),
  (8,0,'lobortis@outlook.edu');
