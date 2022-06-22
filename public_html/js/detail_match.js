/**
 *
 * @param match : match in the database
 */
function detail_match(match) {
    header();
    console.log(match);
    let content = document.getElementById("content");
    content.innerHTML = "";
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
    if (match["o_access_token"].toString() === getCookie('fysm_session').toString()) {
        content_div += "<h6 class='card-subtitle role'>Organisateur</h6>";
        manage_my_match(match.players, match.id);
    } else {
        if (match["b_access_token"] == getCookie('fysm_session')) {
            content_div += "<h6 class='card-subtitle role'>Vous êtes le meilleur joueur du match !</h6>";
        } else if (match.players.length > 0 && getCookie('fysm_session') in match.players["p_access_token"]){
            content_div += "<h6 class='card-subtitle role'>Joueur</h6>";
        }else{
            content_div += "<h6 class='card-subtitle role'>Vous n'êtes pas inscrit à ce match</h6>";
        }
        content_div += "<h6 class='card-subtitle organizer'>Organisateur : " + match.organizer_firstname + " " + match.organizer_lastname + "</h6>";
    }
    content_div +=
        "       <h6 class='card-subtitle'>"+match.organizer_firstname + " " + match.organizer_lastname +"</h6>" +
        "       <p class='card-text date'>"+ match.date_event.slice(0,-3) +"</p>"+
        "       <p class='card-text hour'>Temps du match: " + match.duration.slice(0,-3).replace(':', 'h')+"</p>"+
        "       <p class='card-text address'>"+match.city_address+"</p>"+
        "       <p class='card-text city'>"+match.city+"</p>"+
        "       <p class='card-text '>Nombre minimum de joueur: "+match.min_player+"</p>"+
        "       <p class='card-text '>Nombre maximum de joueur: "+match.max_player+"</p>"+
        "       <p class='card-text nb_registered'>Nombre d'inscrit: "+match.players.length+"</p>"+
        "       <p class='card-text price'>Prix : "+ match.price +"</p>"+
                players.outerHTML +
        "    </div>";
    div_match.innerHTML = content_div;
    content.append(div_match);
    find_city_la_poste(match.city).then(function (result) {
        div_match.getElementsByClassName("city")[0].textContent = result;
    });
    let button_sub = document.createElement("button");
    button_sub.type = "submit";
    button_sub.className = "btn btn-success btn_submit";
    button_sub.innerText = "S'inscrire à ce match";
    content.append(button_sub);
    listener_subscription(button_sub, match.id);

}
function listener_subscription(button, match_id) {
    button.addEventListener("click", function (evt) {
        evt.preventDefault();
        $.ajax({
            method: "GET",
            url: "api.php/inscription_match/?id_match="+match_id + "&email=" +  user_information()["email"],
            success: detail_match
        });
        this.outerHTML = this.outerHTML;
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
function score_best_display(score, best_player) {
    let div = document.createElement("div");
    div.className = "float-end";
    div.append("<input type='text' id='score'/>" +
        "<input type='text' id='best_player'>");
    return div;
}