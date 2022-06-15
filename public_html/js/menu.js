function listener_menu() {
    document.getElementById("connexion").addEventListener("click", function () {
        connexion();
    });
    document.getElementById("title_site").addEventListener("click",function () {
        accueil();
    })
}
function accueil() {
    listener_menu();
}

listener_menu();
