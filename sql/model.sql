/********************************************************************
Create date:    2022-06-15
Author:         Clément Jaminion
Author:         Maxence Laurent
Description:    Create the table and relation of the database
Usage:          psql -U postgres -d doctolibertain -a -f model.sql
                https://stackoverflow.com/a/23992045/12619942
********************************************************************/


-------------------------------------------------------
--- Table : Pysical Condition
-------------------------------------------------------
CREATE TABLE physical_condition(
	id     SERIAL NOT NULL ,
	shape   VARCHAR (50) NOT NULL  ,
	CONSTRAINT physical_condition_PK PRIMARY KEY (id)
);

