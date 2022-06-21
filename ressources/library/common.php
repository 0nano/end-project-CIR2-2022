<?php
    require_once 'exceptions.php';
    /**
     * Redirect to a specific page
     * 
     * @param string $page the request page
     */
    function redirect(string $page): void {
        $scheme = $_SERVER['REQUEST_SCHEME'];
	    $host  = $_SERVER['HTTP_HOST'];
	    $uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
	    header("Location: $scheme://$host$uri/$page");
	    exit;
    }

    /**
     * Save the profile picture in the stored_profile_img
     * 
     * @param string $data of the picture in URI format
     * @param string $name of the picture
     * 
     * @throws UploadProfilePictureException if the upload failed
     */
    function saveProfileImg(string $data, string $name): void {
        $path = "stored_profile_img/". $name;
        if (!file_put_contents($path, $data)){
            throw new UploadProfilePictureException("Error during upload file");
        }
    }

    /**
     * Return the image of a profile
     * 
     * @param string $name of the picture
     * 
     * @return string the data of the picture in URI format
     */
    function giveProfileImg(string $name): ?string {
        $path = "stored_profile_img/". $name;
        if (!file_get_contents($path)){
            return NULL;
        }
        
        $data = file_get_contents($path);

        return $data;
    }
?>