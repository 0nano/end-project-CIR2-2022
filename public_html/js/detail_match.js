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
    content.append("" +
        "<div id='match' class='col-md-10 card'>" +
        "   <div class='card-body'>" +
        "       <h5 class='card-title'>"+ match.sport_name +"</h5>" +
        "       <h6 class='card-subtitle'>"+match.organizer.firstname + " " + match.organizer.lastname +"</h6>" +
        "       <p class='card-text date'>"+match.date_event+"</p>"+
        "       <p class='card-text hour'>"+match.duration+"</p>"+
        "       <i class='fa fa-address-book'></i><p class='card-text address'>"+match.city_address+"</p>"+
        "       <p class='card-text city'>"+match.city+"</p>"+
        "       <p class='card-text nb_player_min'>Min"+match.min_player+"</p>"+
        "       <p class='card-text nb_player_max'>Max"+match.max_player+"</p>"+
        "       <p class='card-text nb_registered'>Nombre d'inscrit:"+match.nb_regis+"</p>"+
        "       <p class='card-text price'>Prix :"+match.price+"</p>"+
                players.outerHTML +
        "    </div>"+
        "</div>");
}
function listener_subscription(button) {
    button.addEventListener("click", function (evt) {
        evt.preventDefault();
        $.ajax({
            method: "GET",
            url: "api.php/detail?id_match="+id_match,
            success: detail_match
        });
    });
}