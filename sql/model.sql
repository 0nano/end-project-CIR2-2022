/********************************************************************
Create date:    2022-06-15
Author:         Clément Jaminion
Author:         Maxence Laurent
Description:    Create the table and relation of the database
Usage:          psql -U postgres -d doctolibertain -a -f model.sql
                https://stackoverflow.com/a/23992045/12619942
********************************************************************/

DROP TABLE IF EXISTS notifier CASCADE;
DROP TABLE IF EXISTS list_player CASCADE;
DROP TABLE IF EXISTS match CASCADE;
DROP TABLE IF EXISTS sport CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS physical_condition CASCADE;

-------------------------------------------------------
--- Table : Pysical Condition
-------------------------------------------------------
CREATE TABLE physical_condition(
	id      SERIAL PRIMARY KEY NOT NULL,
	shape   VARCHAR (50) NOT NULL
);
 
------------------------------------------------------------
-- Table: User
------------------------------------------------------------
CREATE TABLE users(
	email          VARCHAR (64) PRIMARY KEY NOT NULL,
	firstname      VARCHAR (64) NOT NULL,
	lastname       VARCHAR (64) NOT NULL,
	age            INTEGER,
	city           NUMERIC (5,0)  NOT NULL,
	picture        VARCHAR (64),
	pwd_hash       VARCHAR (64) NOT NULL,
	notation       SMALLINT,
	access_token   VARCHAR (64),
	shape_id       INTEGER NOT NULL,

    FOREIGN KEY (shape_id) REFERENCES physical_condition(id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

------------------------------------------------------------
-- Table: Sport
------------------------------------------------------------
CREATE TABLE sport(
	id           SERIAL PRIMARY KEY NOT NULL,
	sport_name   VARCHAR (50) NOT NULL
);

------------------------------------------------------------
-- Table: Match
------------------------------------------------------------
CREATE TABLE match(
	id             SERIAL NOT NULL PRIMARY KEY,
	city_address   VARCHAR (64) NOT NULL,
	city           NUMERIC (5,0)  NOT NULL,
	min_player     INTEGER  NOT NULL,
	max_player     INTEGER  NOT NULL,
	date_event     TIMESTAMP  NOT NULL,
	duration       TIME  NOT NULL,
	price          VARCHAR (50),
	score          VARCHAR (50),
	id_sport       INTEGER  NOT NULL,
	organizer      VARCHAR (64) NOT NULL,
	best_player    VARCHAR (64),

	FOREIGN KEY (id_sport) REFERENCES sport(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (organizer) REFERENCES users(email)
        ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (best_player) REFERENCES users(email)
        ON UPDATE CASCADE ON DELETE CASCADE
);

------------------------------------------------------------
-- Table: Player list
------------------------------------------------------------
CREATE TABLE list_player(
	id                  INTEGER NOT NULL,
	player              VARCHAR (64) NOT NULL,
	states              SMALLINT NOT NULL,

	CONSTRAINT lister_joueur_PK PRIMARY KEY (id, player, states),

	FOREIGN KEY (id) REFERENCES match(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (player) REFERENCES users(email)
        ON UPDATE CASCADE ON DELETE CASCADE
);

------------------------------------------------------------
-- Table: Notifier
------------------------------------------------------------
CREATE TABLE notifier(
    id                INT  NOT NULL,
	email             VARCHAR (64) NOT NULL,
	type_notif   VARCHAR (64) NOT NULL,
	CONSTRAINT notifier_PK PRIMARY KEY (id, email),

	CONSTRAINT notifier_users_FK FOREIGN KEY (email) REFERENCES users(email)
        ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT notifier_match_FK FOREIGN KEY (id) REFERENCES match(id)
        ON UPDATE CASCADE ON DELETE CASCADE
);