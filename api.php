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
    
	$authorization = $_SERVER['HTTP_AUTHORIZATION'];

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
		break;
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
		break;
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
		break;
	case 'user' . 'GET' :
		$authorization = getAuthorizationToken();

		try {
			$userInfos = $db->getUserInfos($authorization);
			http_response_code(200);
			die(json_encode($userInfos));
		} catch (AuthenticationException $_) {
			APIErrors::invalidGrant();
		}
		break;
	default:
		http_response_code(404);
		die();
		break;
}
?>
