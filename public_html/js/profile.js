function profile() {
    if(getCookie('fysm_session').length < 0){
        home();
    }

    header();
    let content = document.getElementById('content');
    content.innerHTML = "";

    userMatchs().then(matchs => {
        console.log(matchs);
        let corps = document.createElement("div");
        if (matchs.length <= 0){
            corps.innerHTML = "" +
            "   <div class='card text-center'><div class='card-body text-dark'>" +
            "       <h5 class='card-title'> Vous n'avez pour le moment participé à aucun match, voulez-vous en chercher un ou bien en organiser un ?</h5>"+
            "       <br><br><p class='card-text'><button class='btn btn-success btn_submit' id='return_homepage'>Chercher un match / Organiser un match</button></p>"+
            "    </div></div>";
            content.innerHTML = "" + corps.outerHTML;
            $('#return_homepage').click(() => {
                home();
            })
        }else{
            let past = document.createElement("div");
            past.innerHTML += "" + "<h2 class='mt-3'>Vos matchs passés :</h2>";
            let futur = document.createElement("div");
            futur.innerHTML += "" + "<h2>Vos matchs futurs :</h2>";
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let set_match = [];
            let change_status = [];
            matchs.forEach(element => {
                if(!set_match.includes(element.id)){
                    if (Date.parse(element.date_event) < Date.now()) {
                        let heure = new Date(element.date_event);
                        let status = (element.organizer == document.getElementById('user_email').innerText)?"Organisateur":"Joueur";
                        past.innerHTML +=  "<div class='card text-dark mt-3'>" +
                        "       <div class='card-header'><h6 class='card-title'>Macth du "+ heure.toLocaleDateString('fr-FR', options) + " à "+ heure.getHours() +":"+ heure.getMinutes() +
                        "<span class='badge rounded-pill text-bg-primary float-end' id='"+ element.id +"'>Satut : "+ status +"</span></h6></div>"+
                        "       <div class='card-body'><p class='card-text city'>Sport: "+ element.sport_name +"</p><p class='card-text city'>"+element.city +"</p>"+
                        "<button class='btn btn-success btn_submit float-end' name='viewMatch' matchID='"+ element.id +"'>Voir les détails du match</button></div>"+
                        "</div>";
                        set_match.push(element.id);
                    } else {
                        let heure = new Date(element.date_event);
                        let status = (element.organizer == document.getElementById('user_email').innerText)?"Organisateur":"Joueur";
                        futur.innerHTML += "" + "<div class='card text-dark mt-3'>" +
                        "       <div class='card-header'><h6 class='card-title'>Macth du "+ heure.toLocaleDateString('fr-FR', options) + " à "+ heure.getHours() +":"+ heure.getMinutes() +
                        "<span class='badge rounded-pill text-bg-primary float-end' id='"+ element.id +"'>Satut : "+ status +"</span></h6></div>"+
                        "       <div class='card-body'><p class='card-text '>Sport: "+ element.sport_name +"</p><p class='card-text city'>"+element.city +"</p>"+
                        "<button class='btn btn-success btn_submit float-end' name='viewMatch' matchID='"+ element.id +"'>Voir les détails du match</button></div>"+
                        "    </div>";
                        set_match.push(element.id);
                    }
                }else{
                    change_status.push(element.id);
                }
            });
            content.innerHTML = "" + futur.outerHTML + past.outerHTML;
            let cities_divs = document.getElementsByClassName("city");
            cities_divs.forEach( function (a_city_div) {
                find_city_la_poste(a_city_div.textContent).then(function (result) {
                    a_city_div.textContent = "Dans la ville de " + result;
                });
            });
            change_status.forEach(element => {
                document.getElementById(element).innerText = "Statut : Organisateur et Joueur";
            })

            let viewbutttons = document.getElementsByName('viewMatch');
            viewbutttons.forEach(element => {
                listener_match(element, element.getAttribute('matchID'));
                /*element.addEventListener('click', (event) => {
                    event.stopImmediatePropagation();
                    console.log('viewMatch '+ element.getAttribute('matchID'));
                    detail_match(element.getAttribute('matchID'));
                })*/
            })
        }
    });
}