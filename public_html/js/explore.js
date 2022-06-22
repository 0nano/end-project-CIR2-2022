function explore(matchs, search = true, map = false) {
    header();
    let content = document.getElementById("content");
    if (search) {
        let search_div = "" +
            "<div class='row'>" +
            "   <span class='col-md-1'></span>";
        search_bar_complete().then(element => {
            search_div += element.outerHTML;
            search_div +=
                "   <span class='col-md-1'></span>" +
                "</div>";
            content.innerHTML = search_div;
            listener_search();
            match_display(content, matchs, map);
        });
    }else{
        match_display(content, matchs, map);
    }
    function match_display(content, matchs, map) {
        if (!matchs[0]) {
            let error = document.createElement("p");
            error.className = "alert alert-secondary";
            error.textContent = "Aucun match n'a été trouvé";
            document.getElementById("errors").append(error);
        } else {
            let match_div = document.createElement("div");
            match_div.outerHTML = "<div id='matchs' class='col-md-5'></div>";
            matchs.forEach(function (match) {
                let a_match_content =
                    "<div id='" + match.id + "' class='match card'>" +
                    "    <div class='card-body'>" +
                    "        <h5 class='card-title'>" + match.sport_name + "</h5>";
                if (match["access_token"] === getCookie('fysm_session')) {
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
                match_div.append(a_match_content);
                content.append(match_div);
                listener_match(a_match_content, match.id);
            });
            if (map) {
                map(content);
            }
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

function manage_my_match(players, match_id) {
    let form = document.createElement("form");
    form.className = "float-end";
    form.id = "form_manage";
    let score  = document.createElement("input");
    score.outerHTML = "<input type='text' id='score'/>";
    let best = document.createElement("select");
    players.forEach(function (player) {
        best.append("<option value='"+ player.email +"' >" + player.firstname + " " + player.lastname+"</option>")
    });
    form.append("<button type='submit'>Enregistrer les informations</button>");
    form.addEventListener("submit", add_stats, score.value, best.value, match_id);
    return form;
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
            detail_match(match_id);
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
// Test
//explore({});
