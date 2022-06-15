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

function home() {

    // Creation content
    let content = document.getElementById("content");

    content.innerHTML = "" +
        "<div class='row'>" +
        "   <span class='col-md-1'></span>"+
            search_bar_complete().outerHTML +
        "   <span class='divider'></span>" +
        "   <span class='col-md-1'></span>" +
        "   <button type='button' id='organize_button' class='btn col-md-10'>Organiser un match</button>" +
        "</div>";
}
function find_city_la_poste(){
    return "nom de la ville";
}

accueil();
