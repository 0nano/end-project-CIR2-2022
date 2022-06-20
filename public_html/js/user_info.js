function user_information(access_token) {
    // TODO : retrouver email, firstname, lastname en fonction access_token
    //ajax
    ajaxRequest("GET", "api.php/user", function (data) {
        return {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname
        }
    });
}