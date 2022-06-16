function header_connexion(){
    document.getElementById("notification").classList.add("d-none");
    document.getElementById("user_name").classList.add("d-none");
    document.getElementById("setting").classList.add("d-none");
    document.getElementById("connexion").classList.remove("d-none");
}
function header_connected() {
    document.getElementById("notification").classList.remove("d-none");
    document.getElementById("user_name").classList.remove("d-none");
    document.getElementById("setting").classList.remove("d-none");
    document.getElementById("connexion").classList.add("d-none");
}
function listener_menu() {
    document.getElementById("connexion").addEventListener("click", function () {
        connexion();
        console.log("connexion");
    });
    document.getElementById("title_site").addEventListener("click",function (evt) {
        evt.preventDefault();
        console.log("home");
        home();
    });
    document.getElementById("notification").addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("notification");

    });
    document.getElementById("user_name").addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("click on user_name");

    });
    document.getElementById("setting").addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("setting");

    });
}

function header() {
    if ("connectéeee"){
        header_connected();
    }else{
        header_connexion();
    }
    listener_menu();
}