function display_connexion(){

    // Creation content
    let content = document.getElementById("content");
    let form_connexion = document.createElement("div");
    form_connexion.id = "form_connexion";
    form_connexion.classList.add("col-md-4");
    form_connexion.innerHTML = "" +
        "<form class='form'>" +
        "   <div class='input-group'>\n" +
        "       <label for='mail' class='input-group-text'>Email ></label>\n" +
        "       <input class='form-control' type='text' id='mail' placeholder='Entrez votre email'/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='pwd' class='input-group-text'>Mot de passe ></label>\n" +
        "       <input class='form-control' type='password' id='pwd' placeholder='Entrez votre mot de passe'/>\n" +
        "   </div>" +
        "   <button id='connexion_button' type='button' class='btn'>\n" +
        "       Se connecter\n" +
        "   </button>\n" +
        "</form>\n" +
        "<button type='bouton' id='inscription_button' class='btn'>Vous n'êtes pas inscrit > S'inscrire</button>";
    content.innerHTML = "" +
        "<div class='row'>" +
        "   <span class='col-md-4'></span>" +
        form_connexion.outerHTML +
    "</div>";
}
function listener_connexion() {
    document.getElementById("inscription_button").addEventListener("click", function () {
        console.log("click on inscription");
        inscription();
    });

    /*document.getElementById("connexion_button").addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("connexion");
        let mail = document.getElementById("mail").value;
        let pwd = document.getElementById("pwd").value;
        ajaxRequest("POST", "api.php/connexion?mail="+mail+"&pwd="+pwd, user_session);
    });*/

    $('#connexion_button').click(() => {
        $.ajax({
            type: 'POST',
            url: 'api.php/login',
            data: {
                email: $('#mail').val(),
                pwd: $('#pwd').val()
            }
        }).done((data) => {
            user_session(data);
        });
    })
}
function connexion() {

    let cookie = getCookie('fysm_session');
    if(cookie.length > 0){
        $.ajax({
            type: 'GET',
            url: 'api.php/user',
            headers: {
                Authorization: 'Bearer ' + cookie
            }
        }).done((_) => {
            console.log("Connexion bonne");
        })
    }

    display_connexion();
    listener_connexion();
}

function user_session(data) {

    console.log(data);
    createCookie('fysm_session', data['access_token']);
    console.log("Connexion bonne");
    //redirects to home page
    home();
}