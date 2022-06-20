async function user_information() {
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