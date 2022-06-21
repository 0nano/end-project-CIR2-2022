async function explore(matchs, search = true, map = true) {
    header();
    let content = document.getElementById("content");
    document.getElementById("errors").innerHTML = ""; //delete all error
    if (search) {
        content.innerHTML = "" +
            "<div class='row'>" +
            "   <span class='col-md-1'></span>";
        content.innerHTML += await search_bar_complete().outerHTML;
        content.innerHTML +=
            "   <span class='col-md-1'></span>" +
            "</div>";
        listener_search();
    }

    if (!matchs[0]) {
        let error = document.createElement("p");
        error.className = "alert alert-secondary";
        error.textContent = "Aucun match n'a été trouvé";
        document.getElementById("errors").append(error);
    } else {
        content.append("<div id='matchs' class='col-md-5'></div>");
        matchs.forEach(function (match) {
            let a_match_content =
                "<div id='" + match.id + "' class='match card'>" +
                "    <div class='card-body'>" +
                "        <h5 class='card-title'>" + match.sport_name + "</h5>";
            if (match[organizer_firstname] === user.firstname && lastname) { // TODO verify connexion
                a_match_content += "<h6 class='card-subtitle role'>Organisateur</h6>";
            } else {
                if (connected) {
                    a_match_content += "<h6 class='card-subtitle '>Joueur</h6>";
                } else {
                    a_match_content += "       <h6 class='card-subtitle organizer'>Organisateur : " + match.organizer_firstname + " " + match.organizer_lastname + "</h6>";
                }
            }
            a_match_content +=
                "        <p class='card-text date'>" + match.date_event + "</p>" +
                "        <p class='card-text hour'>" + match.duration + "</p>" +
                "        <p class='card-text city'>" + match.city + "</p>" +
                "        <p class='card-text nb_player_max'>" + match.max_player + "</p>" +
                "        <p class='card-text nb_registered'>" + match.nb_regis + "</p>" +
                "    </div> " +
                "</div>";
            content.querySelector("#matchs").append(a_match_content);
            listener_match(a_match_content, match.id);
        });
        if (map) {
            map(content);
        }
    }
}
function listener_match(match, id_match) {
    match.addEventListener("click", function (evt) {
        evt.preventDefault();
        $.ajax({
            method: "GET",
            url: "api.php/detail?id_match="+id_match,
            success: detail_match
        });
    });
}
// Test
//explore({});
