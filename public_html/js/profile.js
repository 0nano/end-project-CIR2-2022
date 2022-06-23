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
            "   <div class='card-body text-dark'>" +
            "       <h4> Vous n'avez pour le moment participer à aucun match, voulez-vous en chercher un ou bien en organiser un ?</h4>"+
            "       <button id='return_homepage'>Chercher un match ou en organiser un</button>"+
            "    </div>";
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