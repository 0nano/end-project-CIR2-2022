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
            "       <input type='number' id='age' class='card-text input-group-text' "+ age +"/>"+
            "       <div id='city_area' class='input-group'>\n" +
            "       <label for='city' class='input-group-text'>Ville ></label>\n" +
            "       <input id='city' insee='"+ user.city +"' class='card-text city' placeholder='"+ user.city +"'/>"+
            "   </div>" +
            "       <img alt='Votre photo' src='"+ user.picture +"'/>"+
            "       <input id='photo' type='file' class='card-img photo'/>       " +
            "       <input id='pwd' class='card-text input-group-text' type='password' placeholder='Mot de passe'/>"+
            "       <input id='pwd_verif' class='card-text input-group-text' type='password' placeholder='Confirmer votre mot de passe'/>"+
            "       <button type='submit' id='register' class='btn'>Enregistrer</button>"+
            "    </div>"+
            "</form>" +
            "<div id='nb_matchs'><h2>Nombre de matchs :" + user.nb_matchs + "</h2></div>" +
            "<div id='notation'>" + star.outerHTML + "</div>";
        find_city_la_poste(user.city).then(function (result) {
            document.getElementById("city").ariaPlaceholder = result;
        });
        auto_complete();
    });
    listener_profile_change(document.getElementById("profile_change"));
}
function listener_profile_change(button) {
    button.addEventListener("submit", function (evt) {
        this.outerHTML = this.outerHTML;
        evt.preventDefault();
        // TODO : manque photo
        ajaxRequest("PUT","api.php/manage_account", profile,"&age=" + $('#age').val() + "&city=" + $('#city').attr('insee') + "&pwd=" + $('#pwd').val() + "&pwd_verif=" + $('#pwd_verif').val() );
    });
}

function notation_star(grade) {
    let stars = document.createElement("div");
    for (let i = 0; i < 5; i++) {
        let star = document.createElement("img");
        star.className = "star";
        star.alt = "star" + i;
        if (i > grade) {
            star.src = 'public_html/img/empty_star.svg';
        }else{
            star.src = 'public_html/img/star.svg';
        }
        stars.append(star);
        star.addEventListener("click", function (){
            change_notation_by(i);
        });
    }
    return stars;
}
function change_notation_by(grade) {
    console.log("Change notation by :", grade);
    ajaxRequest("PUT", "api.php/notation", function () {
        profile();
    }, "grade="+ grade);
}