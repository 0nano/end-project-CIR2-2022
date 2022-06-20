async function user_information(access_token) {
    //ajax
    ajaxRequest("GET", "api.php/account?access_token="+access_token, function (data) {
        let user = {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname
        }
        return user;
    });
}