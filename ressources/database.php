<?php
    /**
     * PHP version 7.4
     * 
     * @author Clément Jaminion
     * @author Maxence Laurent
     */

    require_once 'config.php';
    require_once 'library/exceptions.php';

    /**
     * Collection of methods to communicate with the database.
     */
    class Database 
    {
        protected $PDO;

        /**
         * Construct the connection to the PostgreSQL database.
         * 
         * @throws PDOException Error thrown if the connection to the database failed.
         */
        public function __construct() {
            $db_name = DB_NAME;
            $db_server = DB_SERVER;
            $db_port = DB_PORT;

            $dsn = "pgsql:dbname={$db_name};host={$db_server};port={$db_port}";

            $this->PDO = new PDO($dsn, DB_USER, DB_PASSWORD);
        }

        /**
         * Get user password hash of a user.
         * 
         * @param string $email
         * 
         * @return string The password hash
         */
        private function getUserPasswordHash(string $email): ?string {
            $email = strtolower($email);

            $request = 'SELECT pwd_hash from users where email = :email';

            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':email', $email);
            $statement->execute();

            $result = $statement->fetch(PDO::FETCH_OBJ);

            if(!$result){
                return NULL;
            }

            return $result->pwd_hash;
        }

        /**
         * Verify the credentials.
         * 
         * @param string $email
         * @param string $password
         * 
         * @return bool
         */
        public function verifyUserCredentials(string $email, string $password): bool {
            $password_hash = $this->getUserPasswordHash($email);
            return !empty($password_hash) && password_verify($password, $password_hash);
        }

        /**
         * Verify the user access token
         * 
         * @param string $access_token
         * 
         * @return bool
         */
        public function verifyUserAccessToken(string $access_token): bool {
            $request = 'SELECT * from users where access_token = :access_token';

            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':access_token', $access_token);
            $statement->execute();

            $result = $statement->fetch(PDO::FETCH_OBJ);

            return !empty($result);
        }

        /**
         * Create an access token if the credentials are valid
         * 
         * @param string $email
         * @param string $password
         * 
         * @return string the access_token
         */
        public function getUserAccessToken(string $email, string $password): ?string {
            if(!$this->verifyUserCredentials($email, $password)) {
                return NULL;
            }

            $email = strtolower($email);

            $access_token = hash('sha256', $email . $password . time());

            //Set the access token to the user
            $request = 'UPDATE users set access_token = :access_token where email = :email';

            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':access_token', $access_token);
            $statement->bindParam(':email', $email);
            $statement->execute();

            return $access_token;
        }
        //more add for credentials and connection

        function fysmRequestSports($db){
            try
            {
                /*$request = 'SELECT * FROM sports';
                $statement = $db->prepare($request);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);*/
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
                $request = 'SELECT * FROM physical_condition';
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
                /*$request = 'SELECT * FROM
             LEFT JOIN COUNT(nb_Match)
             WHERE ';
                $statement = $db->prepare($request);
                $statement->bindParam('', $idAccount);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);*/
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