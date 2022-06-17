<?php
    /**
     * PHP version 7.4 
     * 
     * @author  Clément Jaminion
     * @author  Maxence Laurent
     */
    
    /**
     * This exception is thrown when the authentication failed.
     */
    class AuthenticationException extends Exception{
    }

    /**
     * This exception is thrown when trying to create a user with a duplicate email.
     */
    class DuplicateEmailException extends Exception{
    }

    /**
     * This exception is thrown when the upload of the profile picture failed.
     */
    class UploadProfilePictureException extends Exception{
    }

    /**
     * This exception is thrown when a problem is detected in the database and it's not come from the user
     */
    class databaseInternalError extends Exception{
    }
?>