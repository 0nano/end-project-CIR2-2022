<?php
    require_once 'config.php';

    class Database 
    {
        protected $PDO;

        /**
         * Construct the connection to the PostgreSQL database.
         * 
         * @throws PDOException Error thrown if the connection to the database failed.
         */
        public function __construct()
        {
            $db_name = DB_NAME;
            $db_server = DB_SERVER;
            $db_port = DB_PORT;

            $dsn = "pgsql:dbname={$db_name};host={$db_server};port={$db_port}";

            $this->PDO = new PDO($dsn, DB_USER, DB_PASSWORD);
        }

        function fysmRequestSports($db){
            try
            {
                $request = 'SELECT * FROM sports';
                $statement = $db->prepare($request);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            }
            catch (PDOException $exception)
            {
                error_log('Request error: '.$exception->getMessage());
                return false;
            }
            return $result;
        }

        /**
         * @param $db
         * @param $idUser
         * @return false|mixed
         */
        function fysmRequestPhysicalCondition($db, $idUser){
            try
            {
                $request = 'SELECT * FROM physicalCondition';
                $statement = $db->prepare($request);
                $statement->bindParam(':', $idUser);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            }
            catch (PDOException $exception)
            {
                error_log('Request error: '.$exception->getMessage());
                return false;
            }
            return $result;
        }

        /**
         * Permet de connaitre le nom, prénom, ville, photo, age,
         * @param $db
         * @param $idAccount
         * @return false | array(name, firstname, city, photo_url, email, notation, nb_match)
         */
        function account($db, $idAccount){
            try
            {
                $request = 'SELECT * FROM 
             LEFT JOIN COUNT(nb_Match)
             WHERE ';
                $statement = $db->prepare($request);
                $statement->bindParam('', $idAccount);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            }
            catch (PDOException $exception)
            {
                error_log('Request error: '.$exception->getMessage());
                return false;
            }
            return $result;
        }
        function modifyAccount($db, $id_account){

        }
    }
?>