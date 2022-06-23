function profile() {
    if(getCookie('fysm_session').length < 0){
        home();
    }

    header();
    let content = document.getElementById('content');
    content.innerHTML = "";

    userMatchs().then(matchs => {
        console.log(matchs);
        let corps = document.createElement("div");
        if (matchs.length <= 0){
            corps.innerHTML = "" +
            "   <div class='card text-center'><div class='card-body text-dark'>" +
            "       <h5 class='card-title'> Vous n'avez pour le moment participer à aucun match, voulez-vous en chercher un ou bien en organiser un ?</h5>"+
            "       <br><br><p class='card-text'><button class='btn btn-success btn_submit' id='return_homepage'>Chercher un match / Organiser un match</button></p>"+
            "    </div></div>";
            content.innerHTML = "" + corps.outerHTML;
            $('#return_homepage').click(() => {
                home();
            })
        }else{
            matchs.forEach(element => {
            
            });
        }
    });
}