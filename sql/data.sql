delete from match;
DELETE from sport;
DELETE from physical_condition;
DELETE FROM users;

ALTER SEQUENCE physical_condition_id_seq RESTART;
INSERT INTO physical_condition (shape) VALUES
('jamais'), ('assez souvent (1 à 5 fois par mois)'),
('souvent (6 à 10 fois par mois)'),
('très souvent (4 ou 5 fois par semaine)'), 
('tous les jours');

INSERT INTO users (email,firstname,lastname,age,city,picture,pwd_hash,shape_id) VALUES
  ('test@test.dom', 'test', 'test', 20, 44109, 'img/profil.svg', '$2y$10$IOfwEyrZYTCoBOhX1O8hPuAAtBhikQg94vboI1gKzMSVQdOjGwBNO',2),
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
('Rugby'), ('Natation'), ('Football'), (''), ()