function search_bar(cities, sports, periods) {
    let form_search = document.createElement("div");
    form_search.id = "form_search";
    form_search.classList.add("col-md-10");

    //option
    let select_city = document.createElement("select");
    select_city.id = "city";
    select_city.className = 'form-control';
    select_city.innerHTML +=
        "<option value='all'>Toutes les villes</option>";
    cities.forEach(function (a_city) {
        select_city.innerHTML += "<option value="+a_city["city"]+">"+find_city_la_poste(a_city["city"])+"</option>\n";
    });
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
        "   <div class='col-md-3'>\n" +
        "       <label for='city'>Ville</label>\n" +
        select_city.outerHTML +
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
    document.getElementById("search_button").addEventListener("click", function (evt) {
            evt.preventDefault();
            let city = document.getElementById("city").value;
            city = city_to_insee_code(city);
            let sport = document.getElementById("sport").value;
            let period = document.getElementById("period").value;
            let complete = document.getElementById("complete").value;
            ajaxRequest("GET","api.php/search?city="+city+"&sport="+sport+"&period="+period+"&match="+complete, result_search);
        }
    )
}

function result_search(matchs) {




    //redirect to result page
    explore(matchs);
}