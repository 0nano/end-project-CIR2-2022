function profile_settings() {
    if(getCookie('fysm_session').length < 0){
        home();
    }

    header();
    let content = document.getElementById("content");
    content.innerHTML = "";

    all_user_information().then(user => {
        console.log(user);
        let age = "";
        if (user.age == null) {
            age += "placeholder='Entrez votre âge'";
        }else{
            age += "placeholder='"+ user.age +"'";
        }
        if (user ){

        }else{
            
        }
        let star = notation_star(user.notation);
        content.innerHTML = "" +
            "<form id='profile_change' class='col-md-8 card'>" +
            "   <div class='card-body text-dark'>" +
            "       <h6 class='card-title '>"+ user.firstname + " " + user.lastname +"</h6>" +
            "       <input id='pwd' class='card-text input-group-text' type='password' placeholder='Mot de passe'/>"+
            "       <input id='pwd_verif' class='card-text input-group-text' type='password' placeholder='Confirmer votre mot de passe'/>"+
            "       <input type='number' id='age' class='card-text input-group-text' "+ age +"/>"+
            "       <div id='city_area' class='input-group'>\n" +
            "       <label for='city' class='input-group-text'>Ville ></label>\n" +
            "       <input id='city' insee='"+ user.city +"' class='card-text city' placeholder='"+ user.city +"'/>"+
            "   </div>" +
            "       <img alt='Votre photo' src='"+ user.picture +"'/>"+
            "       <input id='photo' type='file' class='card-img photo'/>       " +
            "       <button type='submit' id='register' class='btn btn-success btn_submit'>Enregistrer</button>"+
            "    </div>"+
            "</form>" +
            "<div id='nb_matchs' class='col-md-3'><h2>Nombre de matchs : " + user.nb_matchs + "</h2></div>" +
                star.outerHTML;
        find_city_la_poste(user.city).then(function (result) {
            document.getElementById("city").setAttribute('placeholder', result.toString());
        });
        let autocomplete_box = auto_complete();
        document.getElementById("city_area").append(autocomplete_box);
        listener_profile_change(document.getElementById("profile_change"));
        listener_star();
    });
}
function listener_profile_change(form) {
    form.addEventListener("submit", function (evt) {
        this.outerHTML = this.outerHTML;
        evt.preventDefault();
        // TODO : manque photo
        ajaxRequest("PUT","api.php/manage_account", profile,"&age=" + $('#age').val() + "&city=" + $('#city').attr('insee') + "&pwd=" + $('#pwd').val() + "&pwd_verif=" + $('#pwd_verif').val() );
    });
}

function notation_star(grade) {
    let stars = document.createElement("div");
    stars.id = "stars";
    stars.className = "stars_div col-md-3";
    for (let i = 0; i < 5; i++) {
        console.log("creation d'une étoile :", i);
        let star = document.createElement("img");
        star.className = "star";
        star.alt = i.toString();
        if (i > grade) {
            star.src = 'public_html/img/empty_star.svg';
        }else{
            star.src = 'public_html/img/star.svg';
        }
        stars.append(star);
    }
    return stars;
}
function listener_star() {
    console.log("launch listener on stars");
    let star_img = document.getElementsByClassName("star");
    console.log("star_img :", star_img);
    star_img.forEach(function (star) {
        star.addEventListener("click", function click_notation(evt){
            evt.preventDefault();
            console.log("click on notation i=",star.getAttribute("alt"));
            change_notation_by(star.getAttribute("alt"));
            star.removeEventListener("click", click_notation);
        }, false);
    });

}
function change_notation_by(grade) {
    console.log("Change notation by :", grade);
    ajaxRequest("PUT", "api.php/notation", function () {
        profile();
    }, "grade="+ parseInt(grade));
}