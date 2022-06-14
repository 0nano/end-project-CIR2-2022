<?php

class fysm
{
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