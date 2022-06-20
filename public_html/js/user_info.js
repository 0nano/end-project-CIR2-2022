async function user_information(access_token) {
    // TODO : retrouver email, firstname, lastname en fonction access_token
    //ajax
    let cookie = getCookie('fysm_session');
    let result;
    if (cookie.length > 0) {
        await $.ajax({
            type: 'GET',
            url: 'api.php/user',
            headers: {
                Authorization: 'Bearer ' + cookie
            }
        }).done((data) => {
            result = data;
        })
        return new Promise((resolve) => {
            if (result) {
                resolve(result);
            }
        })
    }
    
}