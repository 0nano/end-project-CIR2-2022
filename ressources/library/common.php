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
        if (!file_put_contents('/var/www/html/end-project-CIR2-2022/stored_profile_img/test', $res)){
            throw new UploadProfilePictureException("Error during upload file");
        }
        exit;
    }

    /**
     * Return the image of a profile
     * 
     * @param string $name of the picture
     * 
     * @return string the data of the picture in URI format
     */
    function giveProfileImg(string $name): ?string {
        if (!file_get_contents("upload/test")){
            die(NULL);
        }
        
        $data = file_get_contents("upload/test");

        die(json_encode($data));
    }
?>