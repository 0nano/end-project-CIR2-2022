/**
 *
 * @param match : match in the database
 */
function detail_match(match) {
    header();
    let content = document.getElementById("content");
    content.innerHTML = "";
    let players = document.createElement("div");
    match.players.forEach(function (player) {
        players.innerHTML += "<div class='player card'><p class='card-title'>"+player.firstname + " " + player.lastname +"</p><img alt='photo du joueur' src='photo/"+player.picture+"'/></div>"
    });
    let div_match = document.createElement("div")
    div_match.outerHTML =
        "<div id='match' class='col-md-10 card match_detail'>" +
        "   <div class='card-body'>" +
        "       <h5 class='card-title'>"+ match.sport_name +"</h5>" +
        "       <h6 class='card-subtitle'>"+match.organizer_firstname + " " + match.organizer_lastname +"</h6>" +
        "       <p class='card-text date'>"+match.date_event+"</p>"+
        "       <p class='card-text hour'>"+match.duration+"</p>"+
        "       <i class='fa fa-address-book'></i><p class='card-text address'>"+match.city_address+"</p>"+
        "       <p class='card-text city'>"+match.city+"</p>"+
        "       <p class='card-text nb_player_min'>Min: "+match.min_player+"</p>"+
        "       <p class='card-text nb_player_max'>Max: "+match.max_player+"</p>"+
        "       <p class='card-text nb_registered'>Nombre d'inscrit: "+match.players.length+"</p>"+
        "       <p class='card-text price'>Prix :"+match.price+"</p>"+
                players.outerHTML +
        "    </div>"+
        "</div>";
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
        this.outerHTML = this.outerHTML;
        evt.preventDefault();
        $.ajax({
            method: "GET",
            url: "api.php/inscription_match/?id_match="+match_id + "&email=" +  user_information()["email"],
            success: detail_match
        });
    });
}