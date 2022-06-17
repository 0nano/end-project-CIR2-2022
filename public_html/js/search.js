function search_bar(cities, sports, periods) {
    let form_search = document.createElement("div");
    form_search.id = "form_search";
    form_search.classList.add("col-md-10");

    //option
    let input_city = document.createElement("input");
    input_city.id = "city";
    input_city.type = "text";
    input_city.setAttribute('insee', "all");
    input_city.className = 'form-control';
    input_city.placeholder = "Filtrer pour une ville";


    let select_sport = document.createElement("select");
    select_sport.innerHTML =
        "<option value='all'>Tous les sports</option>\n";
    select_sport.className = 'form-control';
    select_sport.id ='sport';
    sports.forEach(function (a_sport) {
        select_sport.innerHTML += "<option value=" + a_sport["id"]+">" + a_sport["sport_name"]+"</option>\n";
    });
    let select_period = document.createElement("select");
    select_period.className = 'form-control';
    select_period.id = 'period';
    periods.forEach(function (a_period) {
        select_period.innerHTML += "<option value="+a_period["id"]+">"+a_period["time"]+"</option>\n";
    });
    let select_complete = document.createElement("select");
    select_complete.className = 'form-control';
    select_complete.id = 'complete';
    select_complete.innerHTML += "<option value='all'>Tous</option>" +
        "<option value='0'>incomplet</option>" +
        "<option value='1'>complet</option>";
    // creation form
    form_search.innerHTML = "" +
        "<form class='form row' id='search_bar'>" +
        "   <div id='city_area' class='col-md-3'>\n" +
        "       <label for='city'>Ville</label>\n" +
        input_city.outerHTML +
        "   </div>" +
        "   <div class='col-md-3'>\n" +
        "       <label for='sport'>Sport</label>\n"+
        select_sport.outerHTML +
        "   </div>" +
        "   <div class='col-md-3'>\n" +
        "       <label for='period'>Période</label>\n" +
        select_period.outerHTML +
        "   </div>" +
        "   <div class='col-md-3'>\n" +
        "       <label for='complete'>Complet/Incomplet</label>\n" +
        select_complete.outerHTML +
        "   </div>" +
        "   <button id='search_button' type='button' class='btn btn-success'>\n" +
        "       <i class='fas fa-search'></i>Rechercher" +
        "   </button>\n" +
        "</form>\n";
    return form_search;
}

function search_bar_complete() {
    //model
    let cities = [
        {
            "city": 14000
        },
        {
            "city": 32000
        }
    ];//ville de la bdd (code insee)
    let sports = [
        {
            "id:": 1,
            "sport_name": "basket-ball"
        },
        {
            "id:": 2,
            "sport_name": "football"
        }
    ];//sports de la bdd
    let periods = [
        {
            "id": "7",
            "time": "7jours"
        },
        {
            "id": "15",
            "time": "15jours"
        },
        {
            "id": "30",
            "time": "30jours"
        }
    ];//different periods
    //view
    return search_bar(cities, sports, periods);
}
function listener_search() {
    console.log("listener lancé");
    document.getElementById("search_button").addEventListener("click", function (evt) {
            evt.preventDefault();
            let city = document.getElementById("city").getAttribute('insee');
            let sport = document.getElementById("sport").value;
            let period = document.getElementById("period").value;
            let complete = document.getElementById("complete").value;
            ajaxRequest("GET","api.php/search?city="+city+"&sport="+sport+"&period="+period+"&match="+complete, result_search);
        }
    );
    let autocomplete_box = auto_complete();
    document.getElementById("city_area").append(autocomplete_box);
}



function result_search(matchs) {

    //redirect to result page
    explore(matchs);
}