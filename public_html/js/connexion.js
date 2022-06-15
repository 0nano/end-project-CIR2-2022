
function connexion() {
    // Display
    document.getElementById("notification").classList.add("d-none");
    document.getElementById("user_name").classList.add("d-none");
    document.getElementById("setting").classList.add("d-none");
    document.getElementById("connexion_button").classList.add("d-none");

    // Creation content
    let content = document.getElementById("content");
    let form_connexion = document.createElement("div");
    form_connexion.id = "form_connexion";
    form_connexion.classList.add("col-md-6");
    form_connexion.innerHTML = "" +
        "<form class='form'>" +
        "   <div class='input-group'>\n" +
        "       <label for='mail' class='input-group-text'>Email ></label>\n" +
        "       <input type='text' id='mail' placeholder='Entrez votre email'/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='pwd' class='input-group-text'>Mot de passe ></label>\n" +
        "       <input type='password' id='pwd' placeholder='Entrez votre mot de passe'/>\n" +
        "   </div>" +
        "   <button type='submit' class='btn'>\n" +
        "       <i class='fa fa-save'></i> Se connecter\n" +
        "   </button>\n" +
        "</form>\n" +
        "<button type='' class='btn'>S'inscrire</button>";
    content.innerHTML = "" +
        "<div class='row'>" +
        "   <span class='col-md-4'></span>" +
        form_connexion.outerHTML +
    "</div>";
}
//test
//connexion();