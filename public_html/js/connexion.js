function display_connexion(){
    header();
    document.getElementById("errors").innerHTML = ""; //delete all error
    // Creation content
    let content = document.getElementById("content");
    let form_connexion = document.createElement("div");
    form_connexion.id = "form_connexion";
    form_connexion.classList.add("col-md-10");
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
        "   <button id='connexion_button' type='button' class='btn btn-success btn_submit'>\n" +
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
        console.log("click on inscription");
        inscription();
    });
    document.getElementById("connexion_button").addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("connexion");
        let mail = document.getElementById("mail").value;
        let pwd = document.getElementById("pwd").value;
        ajaxRequest("POST", "api.php/connexion?mail="+mail+"&pwd="+pwd, user_session);
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
    //sessionStorage = (data.userToken);
    createCookie('fysm_session', data['access_token']);
    //redirects to home page
    home();
}
function user_info(user_token) {
    // TODO : retrouver email, firstname, lastname en fonction user_token
    //ajax
    return {
        email: "email@a.com",
        firstname: "firstname",
        lastname: "lastname"
    }
}