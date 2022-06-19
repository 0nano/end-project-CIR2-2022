function profile() {
    header();
    let content = document.getElementById("content");
    content.innerHTML = "";

    //ajax request user information (firstname, lastname, age, city, photo, nb_matchs, notation
    ajaxRequest("GET","api.php/account", function (user) {
        let star = notation_star(user.notation);
        content.append("" +
            "<form id='profile_change' class='col-md-8 card'>" +
            "   <div class='card-body'>" +
            "       <h6 class='card-title'>"+ user.firstname + " " + user.lastname +"</h6>" +
            "       <input type='number' id='age' class='card-text' placeholder='"+ user.age +"'/>"+
            "       <input id='city' insee='00000' class='card-text address' placeholder='"+ user.city +"'/>"+
            "       <img alt='Votre photo' src='"+ "" +"'/>"+
            "       <input id='photo' type='file' class='card-img photo'/>       " +
            "       <input id='pwd' class='card-text input-group' type='password' placeholder='Mot de passe'/>"+
            "       <input id='pwd_verif' class='card-text input-group' type='password' placeholder='Confirmer votre mot de passe'/>"+
            "       <button type='submit' id='register' class='btn'>Enregistrer</button>"+
            "    </div>"+
            "</form>" +
            "<div id='nb_matchs'><h2>"+ user.nb_matchs +"</h2></div>" +
            "<div id='notation'>" + star.outerHTML + "</div>");
        auto_complete();
    });
}
function listener_profile_change(button) {
    button.addEventListener("click", function (evt) {
        evt.preventDefault();
        //manque code pour la photo
        ajaxRequest("PUT","api.php/manage_account", profile,"&access_token=" + access_token + "&age=" + $('#age').val() + "&city=" + $('#city').val() + "&pwd=" + $('#pwd').val() + "&pwd_verif=" + $('#pwd_verif').val() );
    });
}

function notation_star(grade) {
    let stars = document.createElement("div");
    for (let i = 0; i < 5; i++) {
        let star = document.createElement("img");
        star.className = "star";
        star.alt = "star" + i;
        if (i > grade) {
            star.src = '../img/empty_star.svg';
        }else{
            star.src = '../img/star.svg';
        }
        stars.append(star);
        star.addEventListener("click", change_notation_by, i );
    }
    return stars;
}
function change_notation_by(grade) {
    ajaxRequest("PUT", "api.php/notation", function () {
        profile();
    }, "grade="+ grade);
}