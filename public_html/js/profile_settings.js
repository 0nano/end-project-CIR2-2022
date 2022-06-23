function profile_settings() {
    if(getCookie('fysm_session').length < 0){
        home();
    }

    header();
    let content = document.getElementById("content");
    content.innerHTML = "";

    all_user_information().then(user => {
        let age = "";
        if (user.age == null) {
            age += "placeholder='Entrez votre âge'";
        } else {
            age += "placeholder='" + user.age + "'";
        }
        if (user) {

        } else {

        }
        select_shape().then(function (physical_condition_select) {
            content.innerHTML = "" +
                "<form id='profile_change' class='col-md-8 card'>" +
                "   <div class='card-body text-dark'>" +
                "       <h6 class='card-title '>" + user.firstname + " " + user.lastname + "</h6>" +
                "       <input id='pwd' class='card-text input-group-text' type='password' placeholder='Mot de passe'/>" +
                "       <input id='pwd_verif' class='card-text input-group-text' type='password' placeholder='Confirmer votre mot de passe'/>" +
                "       <input type='number' id='age' class='card-text input-group-text' " + age + "/>" +
                "       <div id='city_area' class='input-group'>\n" +
                "       <label for='city' class='input-group-text'>Ville ></label>\n" +
                "       <input id='city' insee='" + user.city + "' class='card-text city' placeholder='" + user.city + "'/>" +
                "   </div>" +
                "   <div class='col-md-3'>" +
                "       <label for='sport'>Forme physique > </label>" +
                        physical_condition_select.outerHTML +
                "   </div>" +
                "       <img alt='Votre photo' src='" + user.picture + "'/>" +
                "       <input id='photo' required='required' type='file' class='card-img'/>" +
                "       <button type='submit' id='register' class='btn btn-success btn_submit'>Enregistrer</button>" +
                "    </div>" +
                "</form>" +
                "<div id='nb_matchs' class='col-md-3'><h2>Nombre de matchs : " + user.nb_matchs + "</h2></div>" +
                "<div id='stars' class='stars_div col-md-3'></div>";
            notation_star(user.notation);
            find_city_la_poste(user.city).then(function (result) {
                document.getElementById("city").setAttribute('placeholder', result.toString());
                let autocomplete_box = auto_complete();
                document.getElementById("city_area").append(autocomplete_box);
            });
            listener_profile_change(document.getElementById("profile_change"));
            listener_star();
        });
    });
}
function listener_profile_change(form) {
    form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        let blob = "";
        let reader = new FileReader();
        reader.readAsDataURL(document.getElementById('photo').files[0]);
        reader.onload = () => {
            blob = new Blob([reader.result]);
            console.log(blob);
            $.ajax({
                method: "PUT",
                url: "api.php/manage_account",
                headers: {
                    Authorization: 'Bearer ' + getCookie("fysm_session")
                },
                data: "pwd=" + $('#pwd').val() + "&pwd_verif=" + $('#pwd_verif').val()
                    + "&age=" + $('#age').val() + "&city=" + $('#city').attr('insee') +
                    "&shape=" + $('#shape').val() +
                    "&photo=" + blob
            }).done(function () {
                profile_settings();
            });
        }
    });
}

function notation_star(grade) {
    let stars = document.getElementById("stars");
    stars.innerHTML = "";
    for (let i = 0; i < 5; i++) {
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
    let star_img = document.getElementsByClassName("star");
    for (let i = 0; i < star_img.length; i++) {
        let star = star_img[i];
        star.addEventListener("click", function click_notation(event){
            event.stopImmediatePropagation();
            change_notation_by(star.getAttribute("alt"));
            star.removeEventListener("click", click_notation);
        }, false);
    }

}
function change_notation_by(grade) {
    $.ajax({
        method : "PUT",
        url : "api.php/notation",
        headers: {
            Authorization: 'Bearer ' + getCookie("fysm_session")
        },
        data: "grade="+ parseInt(grade)
    }).done( function (grade) {
        notation_star(grade);
        listener_star();
    });
}

async function select_shape(shape_selected = false) {
    let physical_condition;
    let select_shape = undefined;
    await $.ajax({ // waiting to get all sports of the database
        type: 'GET',
        url: 'api.php/shape'
    }).done((data) => {
        physical_condition = data;
        select_shape = document.createElement("select");
        select_shape.className = 'form-control';
        select_shape.id ='shape';
        physical_condition.forEach(function (a_sport) {
            if (shape_selected && shape_selected === a_sport["id"]){
                select_shape.innerHTML += "<option selected='selected' value=" + a_sport["id"] + ">" + a_sport["shape"] + "</option>\n";
            }else {
                select_shape.innerHTML += "<option value=" + a_sport["id"] + ">" + a_sport["shape"] + "</option>\n";
            }
        });
    });
    return new Promise((resolve) => {
        if (select_shape) {
            resolve(select_shape);
        }
    });
}