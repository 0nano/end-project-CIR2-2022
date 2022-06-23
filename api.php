<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once 'ressources/config.php';
require_once 'ressources/database.php';
require_once LIBRARY_PATH . '/common.php';
require_once LIBRARY_PATH . '/exceptions.php';

$pathInfo = explode('/', trim($_SERVER['PATH_INFO'], '/\\'));

header('content-type: application/json; charset=utf-8');

$db = new Database();

function getAuthorizationToken(): ?string{
    
	$headers = getallheaders();

	$authorization = $headers['Authorization'];

	if (!isset($authorization)) {
		APIErrors::invalidHeader();
	}

	$authorization = explode(' ', trim($authorization), 2)[1];

	if (empty($authorization)) {
		APIErrors::invalidGrant();
	}
	return $authorization;
}

class APIErrors{

	public static function invalidGrant()
	{
		http_response_code(400);
		die(json_encode(array(
			'error' => 'invalid_grant',
			'error_description' => 'The authorization code is invalid or expired.'
		)));
	}

	public static function invalidHeader()
	{
		http_response_code(400);
		die(json_encode(array(
			'error' => 'invalid_header',
			'error_description' => 'The request is missing the Authorization header or the Authorization header is invalid.'
		)));
	}

	public static function invalidRequest()
	{
		http_response_code(400);
		die(json_encode(array(
			'error' => 'invalid_request',
			'error_description' => 'The request is missing a parameter, uses an unsupported parameter, uses an invalid parameter or repeats a parameter.'
		)));
	}

	public static function invalidCredential()
	{
		http_response_code(400);
		die(json_encode(array(
			'error' => 'invalid_credential',
			'error_description' => 'The request has error(s) in the credentials gave.'
		)));
	}

	public static function internalError()
	{
		http_response_code(500);
		die();
	}
}

switch ($pathInfo[0] . $_SERVER['REQUEST_METHOD']) {
	// -------- Connection / Inscription --------
	case 'login' . 'POST':
		$email = $_POST['email'];
		$password = $_POST['pwd'];

		if (!isset($email) || !isset($password)) {
			APIErrors::invalidRequest();
		}

		$access_token = $db->getUserAccessToken($email, $password);

		if (empty($access_token)) {
			APIErrors::invalidRequest();
		}

		http_response_code(200);
		die(json_encode(array(
			'access_token' => $access_token,
			'created_at' => time(),
			'token_type' => 'bearer'
		)));
	case 'logout' . 'POST':
		$authorization = getAuthorizationToken();

		try {
			$db->removeUserAccessToken($authorization);
		} catch (AuthenticationException $_) {
			APIErrors::invalidGrant();
		}

		http_response_code(200);
		die(json_encode(array(
			'message' => 'Authorization code delete successfully.'
		)));
	case 'register' . 'POST':
		$firstname = $_POST['firstname'];
		$lastname = $_POST['lastname'];
		$email = $_POST['email'];
		$city = $_POST['city'];
		$picture = file_get_contents($_FILES['image']['tmp_name']);
		$password = $_POST['pwd'];
		$pwd_verif = $_POST['pwd_verif'];

		if ($password != $pwd_verif) {
			APIErrors::invalidCredential();
		}

		try {
			$db->createUser($firstname, $lastname, $email, $city, $password, $picture);
		} catch (Exception $_) {
			APIErrors::invalidRequest();
		}

		$access_token = $db->getUserAccessToken($email, $password);

		http_response_code(200);
		die(json_encode(array(
			'access_token' => $access_token,
			'created_at' => time(),
			'token_type' => 'bearer'
		)));
	// -------- Information users --------
	case 'user' . 'GET' :
		$authorization = getAuthorizationToken();

		try {
			$userInfos = $db->getUserInfos($authorization);

			$userInfos['picture'] = giveProfileImg($userInfos['picture']);

			http_response_code(200);
			die(json_encode($userInfos));
		} catch (AuthenticationException $_) {
			APIErrors::invalidGrant();
		}
		break;

	case 'account' . 'GET':
		$authorization = getAuthorizationToken();

		try {
			$result = $db->getAllAccountInformations($authorization);

			$result['picture'] = giveProfileImg($result['picture']);

			http_response_code(200);
			die(json_encode($result));
		}catch (Exception $_) {
			APIErrors::internalError();
		}
		break;
	case 'manage_account' . 'PUT':
		parse_str(file_get_contents('php://input'), $_PUT);
		try {
			if ($_PUT["pwd_verif"] === $_PUT["pwd"]) {
				$authorization = getAuthorizationToken();
				var_dump("photo blob: " . $_PUT['photo']);
				$picture = file_get_contents($_PUT['photo']);

				$email = $db->getUserInfos($authorization)["email"];
				die(json_encode($db->modifyAccount($authorization, (int) $_PUT["age"], $_PUT["city"], $picture, $_PUT["pwd"], (int) $_PUT["shape"], $email)));
			}else{
				APIErrors::invalidCredential();
			}
		}catch (Exception $_){
			APIErrors::invalidRequest();
		}
		break;
	case 'notation' . 'PUT':
		try {
			parse_str(file_get_contents('php://input'), $_PUT);
			$result = $db->modifyNotation(getAuthorizationToken(), $_PUT["grade"]);
			die(json_encode($result));
		}catch (Exception $_){
			APIErrors::invalidRequest();
		}
		break;

	// -------- Sports --------
	case 'sports' . 'GET' :
		try{
			$result = $db->requestSports();
			http_response_code(200);
			die(json_encode($result));
		}catch (Exception $_) {
			APIErrors::internalError();
		}
		break;
	// -------- Physical condition --------
	case 'shape' . 'GET' :
		try{
			$result = $db->requestPhysicalCondition();
			http_response_code(200);
			die(json_encode($result));
		}catch (Exception $_) {
			APIErrors::internalError();
		}
		break;
	// -------- Matchs --------
	case 'matchs' . 'GET' :
		try {
			$authorization = getAuthorizationToken();

			$result = $db->getAllMatchsForAnUser($authorization);

			http_response_code(200);
			die(json_encode($result));
		} catch (Exception $_) {
			APIErrors::internalError();
		}
		break;
	case 'search' . 'GET' :
		try {
			$city = $_GET['city'];
			$sport = $_GET['sport'];
			$period = $_GET['period'];
			$completeIncomplete = $_GET['match'];
			$result = $db->searchMatch($period, $city, $sport, $completeIncomplete);
			die(json_encode($result));
		} catch (Exception $_){
			APIErrors::internalError();
		}
		break;
	case 'inscription_match' . 'POST' :
		try {
			$idMatch = $_POST["id_match"];
			$authorization = getAuthorizationToken();
			$emailUser = $db->getUserInfos($authorization)["email"];
			$db->subscribeMatch($idMatch, $emailUser);
			return $db->informationsDetail($idMatch);
		}catch (Exception $_){
			APIErrors::internalError();
		}
		break;
	case 'create_match' . 'POST' :
		$result = 0;
		try {
			$sport = $_POST['sport'];
			$minPlayer = $_POST['min_player'];
			$maxPlayer = $_POST['max_player'];
			$city = $_POST['city'];
			$address = $_POST['address'];
			$dateEvent = $_POST['date_event'];
			$time = $_POST['time'];
			$price = $_POST['price'];
			$authorization = getAuthorizationToken();
			$emailUser = $db->getUserInfos($authorization)["email"];
			$idMatch = ($db->createMatch($emailUser ,$sport, $minPlayer, $maxPlayer, $city, $address, $dateEvent, $time, $price));
			$result = $db->informationsDetail($idMatch);
			$result["players"] = $db->playerAccepted($idMatch);
			die(json_encode($result));
		}catch (Exception $_) {
			APIErrors::internalError();
		}
		break;
	case "detail" . 'GET':
		try {
			$idMatch = $_GET["id_match"];
			$result = $db->informationsDetail($idMatch);
			$result["players"] = $db->playerAccepted($idMatch);
			die(json_encode($result));
		}catch (Exception $_) {
			APIErrors::internalError();
		}
		break;
	default:
		http_response_code(404);
		die();
}
?>
