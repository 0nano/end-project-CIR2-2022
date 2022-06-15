/********************************************************************
Create date:    2022-06-15
Author:         Clément Jaminion
Author:         Maxence Laurent
Description:    Create the table and relation of the database
Usage:          psql -U postgres -d doctolibertain -a -f model.sql
                https://stackoverflow.com/a/23992045/12619942
********************************************************************/

DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS list_player CASCADE;
DROP TABLE IF EXISTS notification_type CASCADE;
DROP TABLE IF EXISTS match CASCADE;
DROP TABLE IF EXISTS sport CASCADE;
DROP TABLE IF EXISTS user CASCADE;
DROP TABLE IF EXISTS physical_condition CASCADE;

-------------------------------------------------------
--- Table : Pysical Condition
-------------------------------------------------------
CREATE TABLE physical_condition(
	id      SERIAL NOT NULL PRIMARY KEY,
	shape   VARCHAR (50) NOT NULL
);

------------------------------------------------------------
-- Table: User
------------------------------------------------------------
CREATE TABLE user(
	email          VARCHAR (64) NOT NULL PRIMARY KEY,
	firstname      VARCHAR (64) NOT NULL ,
	lastname       VARCHAR (64) NOT NULL ,
	age            INTEGER ,
	city           NUMERIC (5,0)  NOT NULL ,
	picture        VARCHAR (64)  ,
	pwd_hash       VARCHAR (64) NOT NULL ,
	nb_match       INTEGER  NOT NULL ,
	notation       SMALLINT   ,
	access_token   VARCHAR (64)  ,
	shape_id       int  NOT NULL  ,

    FOREIGN KEY (shape_id) REFERENCES physical_condition(id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

------------------------------------------------------------
-- Table: Sport
------------------------------------------------------------
CREATE TABLE sport(
	id           SERIAL NOT NULL PRIMARY KEY,
	sport_name   VARCHAR (50) NOT NULL
);

------------------------------------------------------------
-- Table: Match
------------------------------------------------------------
CREATE TABLE match(
	id             SERIAL NOT NULL PRIMARY KEY,
	city_address   VARCHAR (64) NOT NULL ,
	city           NUMERIC (5,0)  NOT NULL ,
	min_player     INT  NOT NULL ,
	max_player     INT  NOT NULL ,
	date_event     TIMESTAMP  NOT NULL ,
	duration       TIME  NOT NULL ,
	price          VARCHAR (50)  ,
	score          VARCHAR (50)  ,
	id_sport       INT  NOT NULL ,
	organizer      VARCHAR (64) NOT NULL ,
	best_player    VARCHAR (64)   ,

	FOREIGN KEY (id_sport) REFERENCES sport(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (organizer) REFERENCES user(email)
        ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (best_player) REFERENCES user(email)
        ON UPDATE CASCADE ON DELETE CASCADE
);

------------------------------------------------------------
-- Table: Type of notifications
------------------------------------------------------------
CREATE TABLE notification_type(
	id           SERIAL NOT NULL PRIMARY KEY,
	notif_type   SMALLINT  NOT NULL
);

------------------------------------------------------------
-- Table: lister joueur
------------------------------------------------------------
CREATE TABLE list_player(
	id                  INT  NOT NULL ,
	validate_players    VARCHAR (64)[] NOT NULL ,
	waiting_players     VARCHAR (64)[] NOT NULL ,

	CONSTRAINT lister_joueur_PK PRIMARY KEY (id, validate_players, waiting_players),

	FOREIGN KEY (id) REFERENCES match(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (validate_players) REFERENCES user(email)
        ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (waiting_players) REFERENCES user(email)
        ON UPDATE CASCADE ON DELETE CASCADE
);

------------------------------------------------------------
-- Table: notifications
------------------------------------------------------------
CREATE TABLE notifications(
	email             VARCHAR (64) NOT NULL ,
	id                INT  NOT NULL ,
	id_Notification   INT  NOT NULL  ,
	CONSTRAINT notifier_PK PRIMARY KEY (email,id,id_Notification),

	CONSTRAINT notifier_User_FK FOREIGN KEY (email) REFERENCES public.User(email)
        ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT notifier_match0_FK FOREIGN KEY (id) REFERENCES public.match(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT notifier_Notification1_FK FOREIGN KEY (id_Notification) REFERENCES public.Notification(id)
        ON UPDATE CASCADE ON DELETE CASCADE
);