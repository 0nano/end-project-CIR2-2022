<?php
    /**
     * PHP version 7.4
     * 
     * @author Clément Jaminion
     * @author Maxence Laurent
     */
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
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
        // -------- Account administration --------
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
                throw new AuthenticationException("Authentication failed!");
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
         * @throws AccessTokenNotFound|AuthenticationException if the access token is invalid
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
         * @throws AuthenticationException
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
         * @param string $city
         * @param string $password
         * @param string $picture 's data
         * 
         * @throws DuplicateEmailException if the email already exists
         * @throws UploadProfilePictureException|databaseInternalError if the picture upload failed
         */
        public function createUser(string $firstname, string $lastname, string $email, string $city, string $password, string $picture): void {
            // Test if the user already exists
            $request = 'SELECT * from users where email = :email';

            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':email', $email);
            $statement->execute();

            $result = $statement->fetch(PDO::FETCH_OBJ);

            if ($result) {
                throw new DuplicateEmailException('Email already exists!');
            }

            $picture_name = hash('sha256', $email);

            try {
                saveProfileImg($picture, $picture_name);
            } catch (UploadProfilePictureException $e) {
                throw new UploadProfilePictureException();
            }

            $password_hash = password_hash($password, PASSWORD_BCRYPT);

            $request = 'INSERT into users (email,firstname,lastname,city,picture,pwd_hash,shape_id) values
            (:email, :firstname, :lastname, :city, :picture, :pwd_hash, 2);';
            
            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':email', $email);
            $statement->bindParam(':firstname', $firstname);
            $statement->bindParam(':lastname', $lastname);
            $statement->bindParam(':city', $city);
            $statement->bindParam(':picture', $picture_name);
            $statement->bindParam(':pwd_hash', $password_hash);

            if(!$statement->execute()){
                throw new databaseInternalError();
            }
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
            $request = 'SELECT email, firstname, lastname, city, picture from users where access_token = :access_token';

            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':access_token', $access_token);
            $statement->execute();

            $result = $statement->fetch(PDO::FETCH_ASSOC);

            if (empty($result)) {
                throw new AuthenticationException();
            }
            return $result;
        }
        // -------- User customization --------

        /**
         * @param string $userAccessToken
         * @param int $age
         * @param string $city
         * @param string $photo
         * @param string $pwd
         * @param string $email
         * @return bool
         */
        public function modifyAccount(string $userAccessToken,int $age,string $city,string $photo,string $pwd, int $shape, string $email): bool
        {
            try
            {
                $request = 'UPDATE users SET access_token=:access ';
                if ($age != ""){
                    $request .= ', age = :age ';
                }
                if ($city != ""){
                    $request .= ', city = :city ';
                }
                if ($photo != ""){
                    $request .= ', picture = :picture ';
                }
                if ($pwd != ""){
                    $request .= ', pwd_hash = :pwd ';
                }
                if ($shape != ""){
                    $request .= ', shape_id = :shape ';
                }
                $request .= 'WHERE users.access_token = :access';

                $statement = $this->PDO->prepare($request);
                if ($age != ""){
                    $statement->bindParam(':age', $age);
                }
                if ($city != ""){
                    $statement->bindParam(':city', $city);
                }
                if ($photo != ""){
                    $picture_name = hash('sha256', $email);
                    try {
                        saveProfileImg($photo, $picture_name);
                    } catch (UploadProfilePictureException $e) {
                        throw new UploadProfilePictureException();
                    }
                    $statement->bindParam(':picture', $picture_name);
                }
                if ($pwd != ""){
                    $password_hash = password_hash($pwd, PASSWORD_BCRYPT);
                    $statement->bindParam(':pwd', $password_hash);
                }
                if ($shape != ""){
                    $statement->bindParam(':shape', $shape);
                }
                $statement->bindParam(':access', $userAccessToken);
                $statement->execute();
                return true;
            }
            catch (PDOException $exception)
            {
                error_log('Request error: '.$exception->getMessage());
                return false;
            }
        }

        /**
         * @param string $userAccessToken
         * @param int $newNotation
         * @return array|false
         */
        public function modifyNotation(string $userAccessToken, int $newNotation){
            try
            {
                $request = 'UPDATE users SET notation= :notation 
                    WHERE users.access_token = :access';
                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':notation', $newNotation);
                $statement->bindParam(':access', $userAccessToken);
                $statement->execute();
            }
            catch (PDOException $exception)
            {
                error_log('Request error: '.$exception->getMessage());
                return false;
            }
            return $newNotation;
        }
        // -------- User informations --------
        /**
         * Request the number of matchs of a user (with his access-token)
         * @param $userAccessToken
         * @return false | integer
         */
        public function requestNbMatchs($userAccessToken){
            try
            {
                $request = 'SELECT COUNT(m.id) FROM users
                    LEFT JOIN list_player on users.email = list_player.player
                    LEFT JOIN match m on m.id = list_player.id
                    WHERE users.access_token = :access';
                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':access', $userAccessToken);
                $statement->execute();
                $result = $statement->fetch(PDO::FETCH_ASSOC)["id"];
            }
            catch (PDOException $exception)
            {
                error_log('Request error: '.$exception->getMessage());
                return false;
            }
            return $result;
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
        public function getAllAccountInformations(string $access_token): ?array{
            try {
                $request = 'SELECT email, lastname, firstname, users.city, picture, age, notation, pc.shape, 
                                (SELECT count(id) from list_player l left join users u on l.player = u.email where u.access_token = :access_token ) "nb_matchs" 
                                FROM users LEFT JOIN physical_condition pc on pc.id = users.shape_id
                                WHERE users.access_token = :access_token group by email, pc.shape';

                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':access_token', $access_token);
                $statement->execute();

                $result = $statement->fetch(PDO::FETCH_ASSOC);
            } catch (PDOException $_) {
                throw new databaseInternalError();
            }

            if(empty($result)) {
                throw new AuthenticationException();
            }

            return $result;
        }

        // -------- Sports --------
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
        // -------- Physical Condition --------
        /**
         * Request all the allowed physical condition
         * 
         * @return array of the shape_id and the shape_name
         * 
         * @throws AuthenticationException if the return value is empty
         * @throws databaseInternalError if the query in database doesn't work for any reason
         */
        public function requestPhysicalCondition(): ?array
        {
            try
            {
                $request = 'SELECT * FROM physical_condition;';
                $statement = $this->PDO->prepare($request);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                throw new databaseInternalError();
            }
            if(empty($result)) {
                throw new AuthenticationException();
            }

            return $result;
        }
        // -------- Matchs --------

        /**
         * Gets all matchs where the user where like player
         * 
         * @param string $access_token
         * 
         * @return array with all basic infos for each match
         */
        public function requestMatchsPlayerForAnUser(string $access_token): ?array {
            try {
                $request= 'SELECT m.id, m.city, m.date_event, m.duration, m.score, s.sport_name, m.organizer, m.best_player from match m 
                                left join sport s on m.id_sport = s.id 
                                left join list_player l on l.id = m.id 
                                left join users u on l.player = u.email 
                                where u.access_token = :access_token and l.states = 0';

                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':access_token', $access_token);
                $statement->execute();

                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                throw new databaseInternalError();
            }

            return $result;
        }

        /**
         * Gets all matchs where the user where like organizer
         * 
         * @param string $access_token
         * 
         * @return array with all basic infos for each match
         */
        public function resquestMatchsOrganizerForAnUser(string $access_token): ?array {
            try {
                $request= 'SELECT m.id, m.city, m.date_event, m.duration, m.score, s.sport_name, m.organizer, m.best_player from match m 
                                left join sport s on m.id_sport = s.id 
                                left join users u on m.organizer = u.email 
                                where u.access_token = :access_token';

                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':access_token', $access_token);
                $statement->execute();

                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                throw new databaseInternalError();
            }

            return $result;
        }


        public function getAllMatchsForAnUser(string $access_token): ?array {
            try {
                $player = $this->requestMatchsPlayerForAnUser($access_token);
                $orga = $this->resquestMatchsOrganizerForAnUser($access_token);

                $result = array_merge($player, $orga);
            } catch (databaseInternalError $_) {
                throw new databaseInternalError();
            }

            return $result;
        }
        /** 
         * Search of match with different filters when "all"->no filter
         * @param $period integer (7, 14 or 30 days)
         * @param $city ?string (insee code from the city of the match)
         * @param $sport ?integer (id of a type of sport in sport table)
         * @param $completeIncomplete ?integer ( complete->1 incomplete->0 "all"->the two of us)
         * @return array
         * @throws databaseInternalError
         */
        public function searchMatch(int $period, string $city = "all", $sport = "all", $completeIncomplete = "all") : ?array{
            // period to timestamp object
            try
            {
                $request = "SELECT m.id, s.sport_name, o.email, o.firstname as organizer_firstname, o.lastname as organizer_lastname, m.date_event, m.duration, m.city, m.max_player, COUNT(lp.id) as nb_regis FROM match m
                    INNER JOIN sport s on s.id = m.id_sport
                    LEFT JOIN users o on o.email = m.organizer
                    LEFT JOIN list_player lp on m.id = lp.id";
                $request .= " WHERE date_event > NOW() AND date_event <= NOW() + :period";
                if ($city != "all" || $sport != "all"){
                    if ($city != "all"){
                        $request .= " AND m.city = :city ";
                    }
                    if ($sport != "all"){
                        $request .= " AND m.id_sport = :sport ";
                    }
                }
                $request .= " GROUP BY m.id, s.sport_name, o.email, o.firstname, o.lastname, m.date_event, m.duration, m.city, m.max_player
                    ORDER BY m.date_event ASC;";
                $statement = $this->PDO->prepare($request);
                $period = $period . 'day';
                $statement->bindParam(':period', $period);
                if ($city != "all"){
                    $statement->bindParam(':city', $city);
                }
                if ($sport != "all"){
                    $statement->bindParam(':sport', $sport);
                }
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
                // second sort for complete/incomplete
                if ($completeIncomplete != "all") {
                    if ($completeIncomplete) {// => complete
                        $result = array_filter($result, function ($a_Match) {
                            return ($a_Match["nb_regis"] >= $a_Match["max_player"]);
                        });
                    } else {// => incomplete
                        $result = array_filter($result, function ($a_Match) {
                            return ($a_Match["nb_regis"] < $a_Match["max_player"]);
                        });
                        $result = array_values($result);// to reorganize all match in a table [0], [1], [2] ... without missing number
                    }
                }
            }
            catch (PDOException $exception)
            {
                throw new databaseInternalError();
            }
            return $result;
        }

        /** Give all information about a match
         * @param $idMatch
         * @return array
         * @throws databaseInternalError
         */
        public function informationsDetail($idMatch) : ?array{
            try
            {
                $request = 'SELECT s.sport_name,
                       o.firstname as organizer_firstname, o.lastname as organizer_lastname,
                       b.firstname as best_player_firstname, b.lastname as best_player_lastname,
                       o.email as o_email, b.email as b_email,
                       m.date_event, m.duration,
                       m.city_address, m.city,
                       m.min_player, m.max_player,
                       m.price, m.score,
                       m.id
                    FROM match m
                    INNER JOIN sport s on s.id = m.id_sport
                    LEFT JOIN list_player lp on m.id = lp.id
                    LEFT JOIN users b on b.email = m.best_player
                    LEFT JOIN users o on o.email = m.organizer
                    WHERE m.id = :idMatch
                    GROUP BY o.firstname, s.sport_name, o.lastname, b.firstname, b.lastname, m.date_event, m.duration, m.city_address, m.city, m.min_player, m.max_player, m.price, m.score, m.id, o.email, b.email;';
                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':idMatch', $idMatch);
                $statement->execute();
                $result = $statement->fetch(PDO::FETCH_ASSOC);
            }
            catch (PDOException $exception)
            {
                throw new databaseInternalError();
            }
            return $result;
        }

        /**
         * Give the name of all the players accepted in a match
         * @param $idMatch
         * @return array|null
         */
        public function playerAccepted($idMatch) : ?array
        {
            try {
                $request = 'SELECT u.firstname, u.lastname, u.email as p_email
                    FROM match m
                    LEFT JOIN list_player lp on m.id = lp.id
                    INNER JOIN users u on u.email = lp.player
                    WHERE m.id = :idMatch and lp.states = 0;';//accepted
                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':idMatch', $idMatch);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $exception) {
                return NULL;
            }
            return $result;
        }

        /**
         * @param $accessToken
         * @param $idMatch
         * @return array|int|null|bool
         */
        public function stateOfUser($accessToken, $idMatch)
        {
            try {
                $request = 'SELECT id, states FROM list_player
                    LEFT JOIN users u on u.email = list_player.player
                    WHERE u.access_token = :access_token AND id= :idMatch';
                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':idMatch', $idMatch);
                $statement->bindParam(':access_token', $accessToken);
                $statement->execute();
                $result = $statement->fetch(PDO::FETCH_ASSOC);
            } catch (PDOException $exception) {
                return null;
            }
            return $result;
        }
        function subscribeMatch(int $idMatch, string $emailPlayer){
            try {
                $request = "INSERT INTO list_player(id, player, states)  VALUES (:idMatch, :emailPlayer, 1 );";
                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':idMatch', $idMatch);
                $statement->bindParam(':emailPlayer', $emailPlayer);
                $statement->execute();

                $emailOrganizer = $this->informationsDetail($idMatch)["o_email"];

                $request = "INSERT INTO notifier(id, email, type_notif) VALUES (:idMatch, :emailOrganizer, :emailPlayer );";
                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':idMatch', $idMatch);
                $statement->bindParam(':emailOrganizer', $emailOrganizer);
                $notify = "demande inscription de ".$emailPlayer;
                $statement->bindParam(':emailPlayer', $notify);
                $statement->execute();

            }catch (PDOException $exception) {
                return NULL;
            } catch (databaseInternalError $e) {
            }
        }
        function createMatch(string $emailPlayer, int $sport, int $minPlayer, int $maxPlayer, string $city, string $address, $dateEvent, $time, string $price){
            try {
                $request = "INSERT INTO match(city_address, city, min_player, max_player, date_event, duration, price, id_sport, organizer)
                    VALUES (:address, :city, :minPlayer, :maxPlayer, :date, :time, :price, :sport, :emailPlayer) RETURNING id;";
                $statement = $this->PDO->prepare($request);
                $statement->bindParam(':address', $address);
                $statement->bindParam(':city', $city);
                $statement->bindParam(':minPlayer', $minPlayer);
                $statement->bindParam(':maxPlayer', $maxPlayer);
                $statement->bindParam(':date', $dateEvent);
                $statement->bindParam(':time', $time);
                $statement->bindParam(':price', $price);
                $statement->bindParam(':sport', $sport);
                $statement->bindParam(':emailPlayer', $emailPlayer);
                $statement->execute();
                return ($statement->fetch()["id"]);
            }catch (PDOException $exception) {
                return NULL;
            }
        }
        // -------- Notifications --------
        /**
         * Gets all the player of a match and their state
         * 
         * @param int $id
         * 
         * @return array of the player email and its state for the match
         */
        public function getAllPlayersForAMatch(int $id): ?array {
            $request = 'SELECT player, states from list_player where id = :id';

            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':id', $id);
            $statement->execute();

            $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            if (empty($result)) {
                return NULL;
            }
            return $result;
        }

        /**
         * Gets notification for the user
         * 
         * @param string $access_token
         * 
         * @return array of the type of notification
         */
        public function getAllNotificationForAnUser(string $access_token): ?array {
            $request = 'SELECT type_notif from notifier n left join users u on n.email = u.email where access_token = :access_token';
            $statement = $this->PDO->prepare($request);
            $statement->bindParam(':access_token', $access_token);
            $statement->execute();
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            if (empty($result)) {
                return NULL;
            }
            return $result;
        }
    }