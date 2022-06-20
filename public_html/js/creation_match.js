function display_creation_match(){
    header();
    document.getElementById("errors").innerHTML = ""; //delete all error
    // Creation content
    let content = document.getElementById("content");
    let form_creation_match = document.createElement("div");
    form_creation_match.id = "form_creation_match";
    form_creation_match.classList.add("col-md-10");

    //ajax
    // user

    // sports
    let sports = [
        {
            "id:": 1,
            "sport_name": "basket-ball"
        },
        {
            "id:": 2,
            "sport_name": "football"
        }
    ];

    let select_sport = select_sports(sports);

    form_creation_match.innerHTML = "" +
        "<form class='form container-fluid' id='create_form'>" +
        "   <div class='container-fluid row'>\n" +
        "       <div class='col-md-4'>" +
        "           <label for='sport' class='input-group-text'>Sport ⏷</label>"+
                    select_sport.outerHTML +
        "       </div>" +
        "       <span class='col-md-3'></span>" +
        "       <div class='col-md-5 container-fluid'>" +
        "          <div class='input-group col-md-6'>" +
        "             <label for='min_player' class='input-group-text'>Min joueurs ></label>" +
        "             <input class='form-control' type='number' id='min_player' />" +
        "          </div>" +
        "          <div class='input-group col-md-6'>" +
        "          <label for='max_player' class='input-group-text'>Max joueurs ></label>" +
        "             <input class='form-control' type='number' id='max_player' />" +
        "           </div>" +
        "       </div>" +
        "   </div>" +
        "   <div id='city_area' class='input-group'>\n" +
        "       <label for='city' class='input-group-text'>Ville ></label>\n" +
        "       <input class='form-control' type='text' insee='00000' id='city' placeholder='Entrez votre ville'/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='address' class='input-group-text'>Adresse ></label>\n" +
        "       <input class='form-control' type='text' id='address' placeholder='Adresse du stade/gymnase'/>\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='date_event' class='input-group-text'>Date et Heure de début ></label>\n" +
        "       <input class='form-control' type='datetime-local' id='date_event' />\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='time' class='input-group-text'>Temps ></label>\n" +
        "       <input class='form-control' type='time' id='time' placeholder='Temps du match' />\n" +
        "   </div>" +
        "   <div class='input-group'>\n" +
        "       <label for='price' class='input-group-text'>Prix ></label>\n" +
        "       <input class='form-control' type='text' id='price' placeholder='Entrez la récompense du match'/>\n" +
        "   </div>" +
        "   <button id='creation_match_button' type='button' class='btn btn-success btn_submit'>\n" +
        "       Créer ce match" +
        "   </button>" +
        "</form>";
    content.innerHTML = "" +
        "<div class='row'>" +
        "   <span class='col-md-1'></span>" +
        form_creation_match.outerHTML +
        "</div>";
    auto_complete();
}
function listener_creation_match() {
    document.getElementById("creation_match_button").addEventListener("click", function () {
        let fd = new FormData();
        fd.append('sport', $('#sport').val());
        fd.append('min_player', $('#min_player').val());
        fd.append('max_player', $('#max_player').val());
        fd.append('city', $('#city').attr('insee'));
        fd.append('address', $('#address').val());
        fd.append('date_event', $('#date_event').val());
        fd.append('time', $('#time').val());
        fd.append('price', $('#price').val());

        $.ajax({
            type: 'POST',
            url: 'api.php/create_match',
            data: fd,
            contentType: false,
            processData: false
        }).done((data) => {
            if (data) {
                $('errors').innerHTML = "<p class='alert alert-success'>Création du match réussi</p>";
            }
        });
    });
    let autocomplete_box = auto_complete();
    document.getElementById("city_area").append(autocomplete_box);

}
function creation_match() {
    display_creation_match();
    listener_creation_match();
}
//tests
//creation_match();