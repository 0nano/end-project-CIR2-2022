function header_connexion(home){
    document.getElementById("notification").classList.add("d-none");
    document.getElementById("user_name").classList.add("d-none");
    document.getElementById("setting").classList.add("d-none");
    document.getElementById("connexion").classList.remove("d-none");
}
function header_connected() {
    user_information().then((result) => {
        document.querySelector("#user_name button").innerText = result.firstname + " " + result.lastname;

        document.getElementById("notification").classList.remove("d-none");
        document.getElementById("user_name").classList.remove("d-none");
        document.getElementById("setting").classList.remove("d-none");
        document.getElementById("connexion").classList.add("d-none");
    });
}
function listener_menu() {
    document.getElementById("match_menu_button").addEventListener("click", function () {
        this.outerHTML = this.outerHTML;
        creation_match();
        console.log("creation match");
    });
    document.getElementById("search_menu_button").addEventListener("click", function () {
        this.outerHTML = this.outerHTML;
        home();
        console.log("search");
    });

    document.getElementById("connexion").addEventListener("click", function () {
        this.outerHTML = this.outerHTML;
        connexion();
        console.log("connexion");
    });
    document.getElementById("title_site").addEventListener("click",function (evt) {
        evt.preventDefault();
        this.outerHTML = this.outerHTML;
        console.log("home");
        home();
    });
    document.getElementById("notification").addEventListener("click", function () {
        this.outerHTML = this.outerHTML;
        console.log("notification");
        notification();

    });
    document.getElementById("user_name").addEventListener("click", function () {
        this.outerHTML = this.outerHTML;
        console.log("click on user_name");
        profile();
    });
    document.getElementById("setting").addEventListener("click", function () {
        this.outerHTML = this.outerHTML;
        console.log("setting");
        profile_settings();
    });
}

function header(home = false) {
    document.getElementById("errors").innerHTML = ""; //delete all error
    if (getCookie("fysm_session")){// user connected
        header_connected(home);
    }else{
        header_connexion(home);
    }
    if (home){
        document.getElementById("header_shortcut").classList.add("d-none");
    }else{
        document.getElementById("header_shortcut").classList.remove("d-none");
    }
    listener_menu();
}