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
            match_div.id = 'matchs';
            match_div.className='col-md-5';
            matchs.forEach(function (match) {
                let a_match_div = document.createElement("div");
                a_match_div.id = match.id;
                a_match_div.className = 'match card';
                let a_match_content =
                    "    <div class='card-body'>" +
                    "        <h5 class='card-title'>" + match.sport_name + "</h5>";
                if (match["access_token"] === getCookie('fysm_session')) {
                    a_match_content += "<h6 class='card-subtitle role'>Organisateur</h6>";
                } else {
                    if (getCookie('fysm_session')){
                        a_match_content += "<h6 class='card-subtitle '>Joueur</h6>";
                    } else {
                        a_match_content += "<h6 class='card-subtitle organizer'>Organisateur : " + match.organizer_firstname + " " + match.organizer_lastname + "</h6>";
                    }
                }
                a_match_content +=
                    "        <p class='card-text date'>" + match.date_event.slice(0,-3) + "</p>" +
                    "        <p class='card-text hour'>Temps du match: " + (match.duration.slice(0,-3)).replace(':', 'h') + "</p>" +
                    "        <p class='card-text city'>" + match.city + "</p>" +
                    "        <div class='nb'>" +
                    "           <p class='card-text nb_registered'>" + match.nb_regis + "</p>" +
                    "           <p class='card-text nb_player_max'>" + match.max_player + "</p>" +
                    "        </div>" +
                    "    </div> " +
                    "</div>";
                a_match_div.innerHTML += a_match_content;
                match_div.append(a_match_div);
                find_city_la_poste(match.city).then(function (result) {
                    a_match_div.getElementsByClassName("city")[0].textContent = result;
                });
                listener_match(a_match_div, match.id);
            });
            content.append(match_div);
            if (map) {
                map(content);
            }
        }
    }
}

function listener_match(match, id_match) {
    match.addEventListener("click", function (evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        if (getCookie('fysm_session')){
            $.ajax({
                method: "GET",
                url: "api.php/detail?id_match="+id_match,
                headers: {
                    Authorization: 'Bearer ' + getCookie('fysm_session')
                },
            }).done(function (match) {
                detail_match(match);
            });
        }else{
            $.ajax({
                method: "GET",
                url: "api.php/detail?id_match="+id_match,
                headers: {
                    Authorization: 'Bearer' + " null"
                },
            }).done(function (match) {
                detail_match(match);
            });
        }
    });
}

function manage_my_match(players, match_id) {
    let form = document.createElement("form");
    form.className = "float-end";
    form.id = "form_manage";
    let score  = document.createElement("input");
    score.innerHTML = "" + "<input type='text' id='score'/>";
    let best = document.createElement("select");
    players.forEach(function (player) {
        best.append("<option value='"+ player.email +"' >" + player.firstname + " " + player.lastname+"</option>")
    });
    form.append("<button type='submit'>Enregistrer les informations</button>");
    form.addEventListener("submit",function () {
        add_stats(score.value, best.value, match_id);
    });
    return form;
}
// Test
//explore({});
