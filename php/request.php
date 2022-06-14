<?php

require_once('../ressources/database.php');

// Database connection.
$db = Database::class;// à vérifier
if (!$db)
{
    header('HTTP/1.1 503 Service Unavailable');
    exit;
}else{
    $request_method = $_SERVER['REQUEST_METHOD'];
    $request = substr($_SERVER['PATH_INFO'], 1);
    $request = explode('/',$request);
    if ($request[0]=="tweets") {
        if ($request_method == 'POST') {
            if (!empty($_POST[""] && !empty($_POST[""]))) {

            } else {
                header('HTTP/1.1 400 Erreur ');
                exit;
            }
        } else {
            if ($request_method == 'GET') {
                if (!empty($_GET["login"])) {

                    $answer = ;
                } else {
                    //récupération de tous les tweets
                    $answer = ;
                }
            } else {
                parse_str(file_get_contents('php://delete'), $_DELETE);
                if ($request_method == 'DELETE'){
                    //var_dump($request[1]);
                    if (!empty()&&!empty() ) {

                    } else {
                        header('HTTP/1.1 400 Il manque des variables pour votre effacement');
                        exit;
                    }
                } else {
                    parse_str(file_get_contents('php://put'), $_PUT);
                    if ($request_method == 'PUT') {
                        if (!empty($_PUT[""]) && !empty($_PUT[""]) && !empty()) {

                        } else {
                            header('HTTP/1.1 400 Les variables de votre modification ne sont pas bonnes');
                            exit;
                        }
                    } else {
                        header('HTTP/1.1 404 La page demandé n\'existe pas');
                        exit;
                    }
                }
                if (!empty($_GET[""])) {
                    $answer =
                } else {
                    $answer =
                }
            }
        }
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-control: no-store, no-cache, must-revalidate');
        header('Pragma: no-cache');
        echo json_encode($answer);//on envoie au js
    }else{
        header('HTTP/1.1 404 La page demandé n\'existe pas');
        exit;
    }
}