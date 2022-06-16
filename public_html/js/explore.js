function print_result(matchs) {
    header();
    let content = document.getElementById("content");
    content.innerHTML = "";
    search_bar_complete();
    if (!matchs[0]){
        content.append("<p class='alert alert-secondary'>Aucun matchs n'a été trouvé</p>")
    }else{
        matchs.forEach(function (match) {
           content.append("" +
               "<div class='match card'>" +
               "    <div class='card-body'>" +
               "        <h5 class='card-title'>"+ match.sport_name +"</h5>" +
               "        <h6 class='card-subtitle'>"+match.organizer.firstname + " " + match.organizer.lastname +"</h6>" +
               "        <p class='card-text date'>"+match.date_event+"</p>"+
               "        <p class='card-text hour'>"+match.duration+"</p>"+
               "        <p class='card-text city'>"+match.city+"</p>"+
               "        <p class='card-text nb_player_max'>"+match.max_player+"</p>"+
               "        <p class='card-text nb_registered'>"+match.nb_regis+"</p>"+
               "    </div> " +
               "</div>");
        });
    }
}





function explore(matchs) {
    print_result(matchs);
}