function header_connexion(){
    document.getElementById("notification").classList.add("d-none");
    document.getElementById("user_name").classList.add("d-none");
    document.getElementById("setting").classList.add("d-none");
    document.getElementById("connexion").classList.remove("d-none");
}
function header_connected() {
    user_information().then((result) => {
        document.querySelector("#user_name button").innerText = result.firstname + " " + result.lastname;
        document.getElementById('user_email').innerText = "" + result.email;
        
        document.getElementById('user_profile_img').innerHTML = "<img id='user_profile_img' class='img-fluid img-thumbnail' alt='image de profil' src='"+ result.picture +"'/>";
        
        document.getElementById("notification").classList.remove("d-none");
        document.getElementById("user_name").classList.remove("d-none");
        document.getElementById("setting").classList.remove("d-none");
        document.getElementById("connexion").classList.add("d-none");
    });
}
function listener_menu() {
    document.getElementById("match_menu_button").addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        creation_match();
        console.log("creation match");
    }, {capture: true, once: true });
    document.getElementById("search_menu_button").addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        home();
        console.log("search");
    }, {capture: true, once: true });
    document.getElementById("connexion").addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        connexion();
        console.log("connexion");
    }, {capture: true, once: true });
    document.getElementById("title_site").addEventListener("click",function (event) {
        event.stopImmediatePropagation();
        console.log("home");
        home();
    }, {capture: true, once: true });
    document.getElementById("notification").addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        console.log("notification");
        notification();
    });
    document.getElementById("user_id").addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        console.log("click on user_id");
        profile();
    });
    $('#user_deconnexion').click((event) => {
        event.stopImmediatePropagation();
        console.log("click on d??connexion");
        disconnection().then();
    })
    document.getElementById("setting").addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        console.log("setting");
        profile_settings();
    });
}

function header(home = false) {
    document.getElementById("errors").innerHTML = ""; //delete all error
    if (getCookie("fysm_session")){// user connected
        header_connected();
    }else{
        header_connexion();
    }
    let addon = document.getElementById("addon_info");
    addon.innerHTML = "";
    if (home){
        document.getElementById("header_shortcut").classList.add("d-none");
    }else{
        document.getElementById("header_shortcut").classList.remove("d-none");
    }
    listener_menu();
}