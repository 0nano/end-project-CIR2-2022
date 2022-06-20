function header_connexion(){
    document.getElementById("notification").classList.add("d-none");
    document.getElementById("user_name").classList.add("d-none");
    document.getElementById("setting").classList.add("d-none");
    document.getElementById("connexion").classList.remove("d-none");
}
function header_connected(user_token) {
    // TODO : retrouver email, firstname, lastname en fonction access_token
    //ajax
    ajaxRequest("GET", "api.php/user", function (data) {
        let user = {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname
        }
        document.querySelector("#user_name button").innerText = user.firstname + " " + user.lastname;
    });

    document.getElementById("notification").classList.remove("d-none");
    document.getElementById("user_name").classList.remove("d-none");
    document.getElementById("setting").classList.remove("d-none");
    document.getElementById("connexion").classList.add("d-none");
}
function listener_menu() {
    document.getElementById("match_menu_button").addEventListener("click", function () {
        creation_match();
        console.log("creation match");
    });
    document.getElementById("search_menu_button").addEventListener("click", function () {
        home();
        console.log("search");
    });

    document.getElementById("connexion").addEventListener("click", function () {
        connexion();
        console.log("connexion");
    });
    document.getElementById("title_site").addEventListener("click",function (evt) {
        evt.preventDefault();
        console.log("home");
        home();
    });
    document.getElementById("notification").addEventListener("click", function () {
        console.log("notification");
        notification();

    });
    document.getElementById("user_name").addEventListener("click", function () {
        console.log("click on user_name");
        my_match();
    });
    document.getElementById("setting").addEventListener("click", function () {
        console.log("setting");
        profile();
    });
}

function header() {
    if (getCookie("fysm_session")){// user connected
        header_connected(getCookie("fysm_session"));
    }else{
        header_connexion();
    }
    listener_menu();
}