/**
 *
 * @param match : match in the database
 */
function detail_match(match) {
    header();
    let content = document.getElementById("content");
    let players = document.createElement("div");
    players.className = "players";
    match.players.forEach(function (player) {
        players.innerHTML += "<div class='player card'><p class='card-title'>"+player.firstname + " " + player.lastname +"</p><img alt='photo du joueur' src='photo/"+player.picture+"'/></div>";
    });
    let div_match = document.createElement("div");
    div_match.className= 'col-md-10 card match_detail';
    div_match.id = 'match';
    let content_div =
        "       <h5 class='card-title text-center'>"+ match.sport_name +"</h5>"+
        "       <div class='card-body'>";
    if(!getCookie('fysm_session')){
        let error = document.getElementById("errors");
        error.innerHTML = "<p class='alert alert-secondary'>Veillez vous connecter pour réserver</p>";
        error.classList.remove('d-none');
    }else{
        user_information().then(function (user) {
            if (match["o_email"].toString() === user.email) {
                content_div += "<h6 class='card-title role'>Organisateur</h6>";
                content.innerHTML += manage_my_match(match.players, match.id);
            } else {
                console.log(match.players);
                if (match["b_email"] === user.email) {
                    content_div += "<h6 class='card-subtitle role'>Vous êtes le meilleur joueur du match !</h6>";
                } else if (match.players.length > 0 && user.email in match.players["p_email"] && parseInt(match.user_state) == 0) {
                    content_div += "<h6 class='card-subtitle role'>Joueur inscrit</h6>";
                } else {
                    if (parseInt(match.user_state) == 1) {
                        content_div += "<h6 class='card-subtitle role'>En cours de validation</h6>";
                    } else {
                        content_div += "<h6 class='card-subtitle role'>Vous n'êtes pas inscrit à ce match</h6>";
                    }
                }
                content_div += "<h6 class='card-title organizer'>Organisateur : " + match.organizer_firstname + " " + match.organizer_lastname + "</h6>";
            }
            content_div +=
                "       <p class='card-text date'>" + match.date_event.slice(0, -3) + "</p>" +
                "       <p class='card-text hour'>Temps du match: " + match.duration.slice(0, -3).replace(':', 'h') + "</p>" +
                "       <p class='card-text address'>" + match.city_address + "</p>" +
                "       <p class='card-text city'>" + match.city + "</p>" +
                "       <p class='card-text '>Nombre minimum de joueur: " + match.min_player + "</p>" +
                "       <p class='card-text '>Nombre maximum de joueur: " + match.max_player + "</p>" +
                "       <p class='card-text nb_registered'>Nombre d'inscrit: " + match.players.length + "</p>" +
                "       <p class='card-text price'>Prix : " + match.price + "</p>" +
                players.outerHTML +
                "    </div>";
            div_match.innerHTML = content_div;
            content.innerHTML = "";
            content.append(div_match);
            find_city_la_poste(match.city).then(function (result) {
                console.log("Renplissage city :", result);
                div_match.getElementsByClassName("city")[0].textContent = result;
            });
            if (match.best_player_firstname && match.best_player_lastname && match.score) {
                score_best_display(match.score, match.best_player_firstname, match.best_player_lastname);
            }
            let button_sub = document.createElement("button");
            button_sub.type = "submit";
            button_sub.className = "btn btn-success btn_submit";
            button_sub.innerText = "S'inscrire à ce match";
            content.append(button_sub);
            listener_subscription(button_sub, match.id);
        });
    }
}
function listener_subscription(button, match_id) {
    button.addEventListener("click", function subscribe(evt) {
        evt.preventDefault();
        $.ajax({
            method: "POST",
            url: "api.php/inscription_match/",
            headers: {
                Authorization: 'Bearer ' + getCookie('fysm_session')
            },
            data: "id_match="+match_id,
        }).done(function (match) {
            detail_match(match);
        });
        button.removeEventListener("click", subscribe);
        //this.outerHTML = this.outerHTML;
    });
}

function add_stats(score, best_player, match_id) {
    $.ajax({
        type: 'POST',
        url: 'api.php/stat_match',
        data: "?matchid="+ match_id +"+score="+score+"&mvp="+best_player,
        contentType: false,
        processData: false,
        headers: {
            Authorization: 'Bearer ' + getCookie('fysm_session')
        }
    }).done((match_added) => {
        if (match_added) {
            detail_match(JSON.parse(match_id));
            $('errors').innerHTML = "<p class='alert alert-success'>Stat du match réussi</p>";
        }
    });
}
function score_best_display(score, best_player_f, best_player_l) {
    let div = document.createElement("div");
    div.className = "float-end";
    div.innerHTML = "<p id='score'/>" + score + '</p>' +
        "<p type='text' id='best_player'>"+ best_player_f + " " + best_player_l;
    return div;
}