function display_inscription(){
    header();
    // Creation content
    let content = document.getElementById("content");
    let form_inscription = document.createElement("div");
    form_inscription.id = "form_inscription";
    form_inscription.classList.add("col-md-4");
    form_inscription.innerHTML = "" +
        "<form class='form'>" +
        "   <div class='input-group'>\n" +
        "       <label for='firstname' class='input-group-text'>Prénom ></label>\n" +
        "       <input class='form-control' type='text' id='firstname' placeholder='Entrez votre prénom'/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='name' class='input-group-text'>Nom ></label>\n" +
        "       <input class='form-control' type='text' id='name' placeholder='Entrez votre nom'/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='city' class='input-group-text'>Ville ></label>\n" +
        "       <input class='form-control' type='text' id='city' placeholder='Entrez votre ville'/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='photo' class='input-group-text'>Photo ></label>\n" +
        "       <input class='form-control' type='file' id='photo'/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='mail' class='input-group-text'>Email ></label>\n" +
        "       <input class='form-control' type='text' id='mail' placeholder='Entrez votre email'/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='pwd' class='input-group-text'>Mot de passe ></label>\n" +
        "       <input class='form-control' type='password' id='pwd' placeholder='Entrez votre mot de passe'/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='pwd_verif' class='input-group-text'>Mot de passe ></label>\n" +
        "       <input class='form-control' type='password' id='pwd_verif' placeholder='Vérifiez votre mot de passe'/>\n" +
        "   </div>" +
        "   <button id='inscription_button' type='button' class='btn'>\n" +
        "       S'inscrire" +
        "   </button>\n" +
        "</form>\n" +
        "<button type='button' id='connexion_button' class='btn'>Déjà un compte > Se connecter</button>";
    content.innerHTML = "" +
        "<div class='row'>" +
        "   <span class='col-md-4'></span>" +
        form_inscription.outerHTML +
        "</div>";
}
function listener_inscription() {
    document.getElementById("connexion_button").addEventListener("click", function () {
        connexion();
    });
    document.getElementById("inscription_button").addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("Inscription");
        let name = document.getElementById("name").value;
        let firstname = document.getElementById("firstname").value;
        let city = document.getElementById("city").value;
        city = city_to_insee_code(city);
        let mail = document.getElementById("mail").value;
        let pwd = document.getElementById("pwd").value;
        let verifpwd = document.getElementById("pwd_verif").value;
        ajaxRequest("POST", "api.php/createaccount", verif_inscription,"name="+name+"&firstname="+firstname+"&city="+city+"&mail="+mail+"&pwd"+pwd+"&verifpwd="+verifpwd);
    });
}
function inscription() {
    display_inscription();
    listener_inscription();
}
function verif_inscription(data) {
    if (data === false){
        document.getElementById("errors").innerText = "erreur lors de l'inscription";
    }else{
        connexion();
    }
}
//tests
//display_inscription();
