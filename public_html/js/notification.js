
function notification() {
    let notifications_display = document.getElementById("notifications");
    notifications_display.classList.toggle("d-none");
    notifications_display.innerHTML = "";
    console.log("change display notification");
    if (!notifications_display.classList.contains("d-none")) {// if notifications are displayed
        //ajax
        let notifications = [{}];
        notifications_display.append("<p class='alert alert-success'>Test</p>");

        notifications.forEach(function (notification) {
            let a_notify = document.createElement("form");
            a_notify.innerHTML = notification["type_notif"] + "<button class='btn btn-danger'></button>";
            let accept_button = document.createElement("button");
            accept_button.outerHTML = "<button class='btn btn-success'>Accepter</button>";
            accept_button.addEventListener("click",function acceptation() {
                participation( "accept", notification["email"], notification["id"], a_notify);// accept 'email' to participate match 'id'
                accept_button.removeEventListener("click", acceptation);
            });
            let reject_button = document.createElement("button");
            reject_button.outerHTML = "<button class='btn btn-danger'>Refuser</button>";
            reject_button.addEventListener("click", function refusation(){
                participation("reject", notification["email"], notification["id"], a_notify);
                reject_button.removeEventListener("click", refusation);
            });// reject 'email' to participate match 'id'
            a_notify.append(accept_button);
            a_notify.append(reject_button);
            notifications_display.append(a_notify);
        });
    }
}

/**
 *
 * @param accept_or_reject
 * @param player
 * @param id_match
 * @param notification
 */
function participation(accept_or_reject, player, id_match, notification) {
    //ajaxRequest(,, function(data){
    // if(data[blablabla] !== false){
    // delete the notification
    //}else{
        // document.iderror
    //}
    //});
}