function listener_menu() {
    document.getElementById("connexion").addEventListener("click", function () {
        connexion();
    });
    document.getElementById("title_site").addEventListener("click",function (evt) {
        evt.preventDefault();
        accueil();
    })
}
function accueil() {
    // Display
    // verification connection
    if (!"connectéé") {
        document.getElementById("notification").classList.remove("d-none");
        document.getElementById("user_name").classList.remove("d-none");
        document.getElementById("setting").classList.remove("d-none");
        document.getElementById("connexion").classList.add("d-none");
    }else{
        document.getElementById("notification").classList.add("d-none");
        document.getElementById("user_name").classList.add("d-none");
        document.getElementById("setting").classList.add("d-none");
        document.getElementById("connexion").classList.remove("d-none");
    }
    document.getElementById("content").innerHTML = "";
    home();
    listener_menu();
}
function search_bar(cities, sports, periods) {
    let form_search = document.createElement("div");
    form_search.id = "form_search";
    form_search.classList.add("col-md-4");
    //cities

    form_search.innerHTML = "" +
        "<form class='form'>" +
        "   <div class='form-group'>\n" +
        "       <label for='firstname'>Ville</label>\n" +
        "       <select class='form-control' id='firstname'>" +
        "           <option value='all'>Toutes les villes</option>";
    cities.forEach(function (a_city) {
        form_search.innerHTML += "<option value="+a_city["city"]+">"+find_city_la_poste(a_city["city"])+"</option>\n";
    });
    form_search.innerHTML += "" +
        "       </select>\n" +
        "   </div>";
    //sports
    form_search.innerHTML += ""+
        "   <div class='form-group'>\n" +
        "       <label for='sport'>Sport</label>\n";
    let select_sport = document.createElement("select");
    select_sport.innerHTML =
        "<option value='all'>Tous les sports</option>\n";
    select_sport.className = 'form-control'
    select_sport.id ='sport';
    sports.forEach(function (a_sport) {
        select_sport.innerHTML += "<option value=" + a_sport["id"]+">" + a_sport["sport_name"]+"</option>\n";
    });
    form_search.innerHTML +=
        "       \n" +
        "   </div>";

    form_search.innerHTML +=
        "   <div class='form-group'>\n" +
        "       <label for='sport'>Sport</label>\n" +
        "       <select class='form-control' id='sport'>";
    periods.forEach(function (a_period) {
        form_search.innerHTML += "<option value="+a_period["id"]+">"+a_period["time"]+"</option>\n";
    });
    form_search.innerHTML +=
        "       </select>\n" +
        "   </div>";
    form_search.innerHTML +=
        "   <button type='submit' class='btn'>\n" +
        "       Rechercher" +
        "   </button>\n" +
        "</form>\n";
    return form_search;
}

function home() {


    // Creation content
    let content = document.getElementById("content");

    content.innerHTML = "" +
        "<div class='row'>" +
            search_bar_complete().outerHTML +
        "   <button type='button' id='organize_button' class='btn'>Organiser un match</button>" +
        "</div>";

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
function find_city_la_poste(){
    return "nom de la ville";
}

accueil();
