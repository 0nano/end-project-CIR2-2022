
function notification() {
    let notifications_display = document.getElementById("notifications");
    notifications_display.classList.toggle("d-none");
    notifications_display.innerHTML = "";
    //console.log("change display notification");
    if (!notifications_display.classList.contains("d-none")) {// if notifications are displayed
        //ajax
        $.ajax({
            method: "GET",
            url: "api.php/notifications",
            headers: {
                Authorization: 'Bearer ' + getCookie("fysm_session")
            }
        }).done(function (notifications) {
            if (!notifications){
                notifications_display.innerHTML = "<p class='alert alert-secondary'>Vous n'avez aucune notification</p>";
            }else {
                notifications.forEach(function (notification) {
                    let a_notify = document.createElement("form");
                    a_notify.className = "container row";
                    a_notify.innerHTML = "<p class='col-md-6'>" + notification["type_notif"] + " de " + notification["sport_name"] + " du " + notification["date_event"] + "</p>";
                    let accept_button = document.createElement("button");
                    accept_button.type = 'button';
                    accept_button.className = 'btn btn-success col-md-3';
                    accept_button.innerText = "Accepter";
                    accept_button.addEventListener("click", function acceptation() {
                        participation("accept", notification["email"], notification["id"], a_notify);// accept 'email' to participate match 'id'
                        accept_button.removeEventListener("click", acceptation);
                    });
                    let reject_button = document.createElement("button");
                    reject_button.type = 'button';
                    reject_button.className = 'btn btn-danger col-md-3';
                    reject_button.innerText = "Refuser";
                    reject_button.addEventListener("click", function refusation() {
                        participation("reject", notification["email"], notification["id"], a_notify);
                        reject_button.removeEventListener("click", refusation);
                    });// reject 'email' to participate match 'id'
                    a_notify.append(accept_button);
                    a_notify.append(reject_button);
                    notifications_display.append(a_notify);
                });
            }
        });
    }
}

/**
 *
 * @param accept_or_reject : "accept"|"reject"
 * @param player : email of the player
 * @param id_match : id of the match
 * @param notification : HTMLElement
 */
function participation(accept_or_reject, player, id_match, notification) {
    $.ajax({
        method: "POST",
        url: "api.php/manage_notifications",
        headers: {
            Authorization: 'Bearer ' + getCookie("fysm_session")
        },
        data: "accept="+(accept_or_reject==="accept")+"&player="+player+"&id_match="+id_match
    }).done(function (bool_result) {
        if (bool_result) {
            notification.outerHTML = "";
        }
    });
}