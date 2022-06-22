/**
 *
 * @param match : match in the database
 */
function detail_match(match) {
    header();
    //console.log(match);
    let content = document.getElementById("content");
    content.innerHTML = "";
    let players = document.createElement("div");
    match.players.forEach(function (player) {
        players.innerHTML += "<div class='player card'><p class='card-title'>"+player.firstname + " " + player.lastname +"</p><img alt='photo du joueur' src='photo/"+player.picture+"'/></div>";
    });
    let div_match = document.createElement("div");
    let content_div =
        "<div id='match' class='col-md-10 card match_detail'>" +
        "   <div class='card-body'>" +
        "       <h5 class='card-title'>"+ match.sport_name +"</h5>";
    if (match["access_token"] === getCookie('fysm_session')) {
        content_div += "<h6 class='card-subtitle role'>Organisateur</h6>";
    } else {
        if (getCookie('fysm_session')){
            content_div += "<h6 class='card-subtitle '>Joueur</h6>";
        } else {
            content_div += "<h6 class='card-subtitle organizer'>Organisateur : " + match.organizer_firstname + " " + match.organizer_lastname + "</h6>";
        }
    }
    content_div +=
        "       <h6 class='card-subtitle'>"+match.organizer_firstname + " " + match.organizer_lastname +"</h6>" +
        "       <p class='card-text date'>"+ (match.date_event).slice(0,-3) +"</p>"+
        "       <p class='card-text hour'>Temps du match: " + (match.duration.slice(0,-3)).replace(':', 'h') + +"</p>"+
        "       <i class='fa fa-address-book'></i><p class='card-text address'>"+match.city_address+"</p>"+
        "       <p class='card-text city'>"+match.city+"</p>"+
        "       <p class='card-text nb_player_min'>Min: "+match.min_player+"</p>"+
        "       <p class='card-text nb_player_max'>Max: "+match.max_player+"</p>"+
        "       <p class='card-text nb_registered'>Nombre d'inscrit: "+match.players.length+"</p>"+
        "       <p class='card-text price'>Prix :"+match.price+"</p>"+
                players.outerHTML +
        "    </div>"+
        "</div>";
    div_match.outerHTML = content_div;
    console.log(div_match);
    content.append(div_match);
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