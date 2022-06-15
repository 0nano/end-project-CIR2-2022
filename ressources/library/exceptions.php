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
?>