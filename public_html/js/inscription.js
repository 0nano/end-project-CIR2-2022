function display_inscription(){
    header();
    document.getElementById("errors").innerHTML = ""; //delete all error
    // Creation content
    let content = document.getElementById("content");
    let form_inscription = document.createElement("div");
    form_inscription.id = "form_inscription";
    form_inscription.classList.add("col-md-10");
    form_inscription.innerHTML = "" +
        "<form class='form' id='register_form'>" +
        "   <div class='input-group'>\n" +
        "       <label for='firstname' class='input-group-text'>Prénom ></label>\n" +
        "       <input class='form-control' type='text' id='firstname' placeholder='Entrez votre prénom'/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='name' class='input-group-text'>Nom ></label>\n" +
        "       <input class='form-control' type='text' id='name' placeholder='Entrez votre nom'/>\n" +
        "   </div>" +
        "   <div id='city_area' class='input-group'>\n" +
        "       <label for='city' class='input-group-text'>Ville ></label>\n" +
        "       <input class='form-control' type='text' insee='00000' id='city' placeholder='Entrez votre ville'/>\n" +
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
        "       <label for='pwd_verif' class='input-group-text'>Vérification du mot de passe ></label>\n" +
        "       <input class='form-control' type='password' id='pwd_verif' placeholder='Vérifiez votre mot de passe'/>\n" +
        "   </div>" +
        "   <button id='inscription_button' type='button' class='btn btn-success btn_submit'>\n" +
        "       S'inscrire" +
        "   </button>\n" +
        "</form>\n" +
        "<button type='button' id='connexion_button' class='btn btn_other_option'>Déjà un compte > Se connecter</button>";
    content.innerHTML = "" +
        "<div class='row'>" +
        "   <span class='col-md-1'></span>" +
        form_inscription.outerHTML +
        "</div>";
}
function listener_inscription() {
    document.getElementById("connexion_button").addEventListener("click", function () {
        connexion();
    });
    $('#inscription_button').click(() => {
        let reader = new FileReader();
        reader.readAsDataURL(document.getElementById('photo').files[0]);
        reader.onload = () => {
            var blob = new Blob([reader.result]);

            let fd = new FormData();
            fd.append('firstname', $('#firstname').val());
            fd.append('lastname', $('#name').val());
            fd.append('city', $('#city').attr('insee'));
            fd.append('image', blob);
            fd.append('email', $('#mail').val());
            fd.append('pwd', $('#pwd').val());
            fd.append('pwd_verif', $('#pwd_verif').val());

            $.ajax({
                type: 'POST',
                url: 'api.php/register',
                data: fd,
                contentType: false,
                processData: false
            }).done((data) => {
                verif_inscription(data);
            })
        }
    })
    let autocomplete_box = auto_complete();
    document.getElementById("city_area").append(autocomplete_box);

}
function inscription() {
    display_inscription();
    listener_inscription();
}
function verif_inscription(data) {
    if (data === false || typeof  data['error'] != 'undefined'){
        document.getElementById("errors").innerHTML = "<p class='alert alert-danger'>erreur lors de l'inscription</p>";
    }else{
        createCookie('fysm_session', data['access_token']);
        connexion();
    }
}
//tests
//inscription();