<?php
    /**
     * PHP version 7.4
     * 
     * @author Clément Jaminion
     * @author Maxence Laurent
     */

    require_once 'config.php';
    require_once 'library/common.php';
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

            if (!$result) {
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
            if (!$this->verifyUserCredentials($email, $password)) {
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

        /**
         * Connects the user by returning its unique id if the credentials are valid 
         * 
         * @param string $email
         * @param string $password
         * @param int $session_expire (optional) The lifetime of the session cookie in seconds
         * 
         * @throws AuthenticationException if the authentication failed
         */
        public function connectUser(string $email, string $password, int $session_expire = 0):void {
            if (!$this->verifyUserCredentials($email, $password)) {
                throw new AuthenticationException('Authentication failed!');
            }

            $email = strtolower($email);

            $access_token = hash('sha256', $email . $password . microtime(true));

            // Set session hash on the user
            $request = 'UPDATE users set access_token = :access_token where email = :email';

            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':access_token', $access_token);
            $statement->bindParam(':email', $email);
            $statement->execute();

            $access_token = $this->getUserAccessToken($email, $password);

            switch ($session_expire) {
                case 0:
                    $cookie_expire = 0;
                    break;
                default:
                    $cookie_expire = time() + $session_expire;
                    break;
            }

            setcookie('fysm_session', $access_token, $cookie_expire);
        }

        /**
         * Tries to connect the user with its session cookie if valid
         * 
         * @throws AuthenticationException if the authentication failed
         */
        public function tryConnectUser(): void {
            if (!isset($_COOKIE['fysm_session'])) {
                throw new AuthenticationException("Authenticatio failed!");
            }

            $access_token = $_COOKIE['fysm_ session'];

            $request = 'SELECT * form users where access_token = :access_token';

            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':access_token', $access_token);
            $statement->execute();

            $result = $statement->fetch(PDO::FETCH_OBJ);

            if (!empty($result)) {
                throw new AuthenticationException('Authentication failed!');
            }
        }

        /**
         * Remove the access token from the user
         * 
         * @param string $access_token
         * 
         * @throws AccessTokenNotFound if the access token is invalid
         */
        public function removeUserAccessToken(string $access_token): void {
            if (!$this->verifyUserAccessToken($access_token)) {
                throw new AuthenticationException('The access token doesn\'t exist!');
            }

            // Remove the access token
            $request = 'UPDATE users set access_token = NULL where access_token = :access_token';
            
            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':access_token', $access_token);
            $statement->execute();
        }

        /**
         * Disconnects the current user by resetting the session hash stored in the database
         */
        public function disconectUser(): void {
            if (!isset($_COOKIE['fysm_session'])) {
                return;
            }

            $access_token = $_COOKIE['fysm_session'];
            $this->removeUserAccessToken($access_token);

            setcookie('fysm_session', '', time() - 3600);
        }

        /**
         * Create a user in the database and return a bool to result
         *
         * @param string $firstname
         * @param string $lastname
         * @param string $email
         * @param int $city
         * @param string $password
         * @param string $picture 's data
         * 
         * @throws DuplicateEmailException if the email already exists
         * @throws UploadProfilePictureException if the picture upload failed
         */
        public function createUser(string $firstname, string $lastname, string $email, int $city, string $password, string $picture): void {
            // Test if the user already exists
            $request = 'SELECT * from users where email = :email';

            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':email', $email);
            $statement->execute();

            $result = $statement->fetch(PDO::FETCH_OBJ);

            if ($result) {
                throw new DuplicateEmailException('Email already exists!');
            }

            $password_hash = password_hash($password, PASSWORD_BCRYPT);

            $picture_name = hash('sha2560', $email);
            
            try{
                saveProfileImg($picture, $picture_name);
            }catch (UploadProfilePictureException $_) {
                throw $_;
            }

            $request = 'INSERT into users (email,firstname,lastname,city,picture,pwd_hash,shape_id)
                        values (:email, :firstname, :lastname, :city, :picture, :pwd_hash, 2)';
            
            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':email', $email);
            $statement->bindParam(':firstname', $firstname);
            $statement->bindParam(':lastname', $lastname);
            $statement->bindParam(':city', $city);
            $statement->bindParam(':picture', $picture_name);
            $statement->bindParam(':pwd_hash', $password_hash);

            $statement->execute();
        }

        /**
         * Gets the general infos of a user
         * 
         * @param string $access_token 
         * 
         * @return array of the firstname, lastname, city, picture
         * 
         * @throws AuthenticationException if the access_token is not in the database
         */
        public function getUserInfos(string $access_token): ?array {
            $request = 'SELECT firstname, lastname, city, picture from users where access_token = :access_token';

            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':access_token', $access_token);
            $statement->execute();

            $result = $statement->fetch(PDO::FETCH_OBJ);

            if (empty($result)) {
                throw new AuthenticationException();
            }

            return (array) $result;
        }

        /**
         * Allows to know the name, first name, city, photo, age, rating, physical condition
         * 
         * @param string $access_token
         * 
         * @return array (name, firstname, city, photo_url, email, notation, nb_match) in the shape of an object
         * 
         * @throws AuthenticationException if the return value is empty
         * @throws databaseInternalError if the query in database doesn't work for any reason
         */
        public function accountInformations($access_token): array{
            try {
                $request = 'SELECT lastname, firstname, users.city, picture, age, notation, pc.shape FROM users
                                INNER JOIN physical_condition pc on pc.id = users.shape_id
                                INNER JOIN list_player lp on users.email = lp.player
                                LEFT JOIN match m on m.id = lp.id
                                WHERE users.access_token = :access';

                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':access', $access_token);
                $statement->execute();

                $result = $statement->fetchAll(PDO::FETCH_OBJ);
            } catch (PDOException $_) {
                throw new databaseInternalError();
            }

            if(empty($result)) {
                throw new AuthenticationException();
            }

            return $result;
        }

        /**
         * Request all type of sport
         * 
         * @return array of the id and the name
         * 
         * @throws AuthenticationException if the return value is empty
         * @throws databaseInternalError if the query in database doesn't work for any reason
         */
        public function requestSports(): array{
            try {
                $request = 'SELECT * FROM sport';
                $statement = $this->PDO->prepare($request);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $_) {
                throw new databaseInternalError();
            }

            if(empty($result)) {
                throw new AuthenticationException();
            }

            return $result;
        }

        /**
         * Request all the allowed physical condition
         * 
         * @return array of the shape_id and the shape_name
         * 
         * @throws AuthenticationException if the return value is empty
         * @throws databaseInternalError if the query in database doesn't work for any reason
         */
        public function requestPhysicalCondition(){
            try
            {
                $request = 'SELECT * FROM physical_condition';
                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':', $idUser);
                $statement->execute();
                $result = $statement->fetch(PDO::FETCH_ASSOC)[0];
            } catch (PDOException $e) {
                throw new databaseInternalError();
            }

            if(empty($result)) {
                throw new AuthenticationException();
            }

            return $result;
        }

        /**
         * Search of match with different filters when null->no filter
         * @param $period integer (7, 14 or 30 days)
         * @param $city integer (insee code from the city of the match)
         * @param $sport integer (id of a type of sport in sport table)
         * @param $completeIncomplete boolean ( complete->true incomplete->false null->the two of us)
         * @return void
         */
        public function searchMatch($period, $city = null, $sport = null, $completeIncomplete = null){
            // period to timestamp object


        }

    }