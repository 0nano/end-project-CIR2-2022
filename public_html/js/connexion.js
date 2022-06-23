function display_connexion(){
    header();
    document.getElementById("errors").innerHTML = ""; //delete all error
    // Creation content
    let content = document.getElementById("content");
    let form_connexion = document.createElement("div");
    form_connexion.id = "div_connexion";
    form_connexion.classList.add("col-md-10");
    form_connexion.innerHTML = "" +
        "<form class='form' id ='form_connexion'>" +
        "   <div class='input-group'>\n" +
        "       <label for='mail' class='input-group-text'>Email ></label>\n" +
        "       <input class='form-control' type='text' id='mail' placeholder='Entrez votre email' required/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='pwd' class='input-group-text'>Mot de passe ></label>\n" +
        "       <input class='form-control' type='password' id='pwd' placeholder='Entrez votre mot de passe' required/>\n" +
        "   </div>" +
        "   <button id='connexion_button' type='submit' class='btn btn-success btn_submit'>\n" +
        "       Se connecter\n" +
        "   </button>\n" +
        "</form>\n" +
        "<button type='bouton' id='inscription_button' class='btn btn_other_option'>Vous n'êtes pas inscrit > S'inscrire</button>";
    content.innerHTML = "" +
        "<div class='row'>" +
        "   <span class='col-md-1'></span>" +
        form_connexion.outerHTML +
    "</div>";
}
function listener_connexion() {
    document.getElementById("inscription_button").addEventListener("click", function () {
        this.outerHTML = this.outerHTML;
        console.log("click on inscription");
        inscription();
    });
    document.getElementById("form_connexion").addEventListener("submit", function (event) {
        event.stopImmediatePropagation();
        console.log("connexion");
        let mail = document.getElementById("mail").value;
        let upwd = document.getElementById("pwd").value;
        $.ajax({
            type: 'POST',
            url: 'api.php/login',
            data: {
                email: mail,
                pwd: upwd,
            }
        }).done((data) => {
            user_session(JSON.parse(data));
        });
    });
}
function connexion() {
    display_connexion();
    listener_connexion();
}

/**
 * Give the token for stack in $_COOKIE
 * @param data
 */
function user_session(data) {
    createCookie('fysm_session', data['access_token']);
    //redirects to home page
    home();
}

async function deconnexion() {
    let cookie = getCookie('fysm_session');
    await $.ajax({
        type: 'POST',
        url: 'api.php/logout',
        headers: {
            Authorization: 'Bearer ' + cookie
        }
    }).done((_) => {
        Cookies.remove('fysm_session');
        home();
    })
}