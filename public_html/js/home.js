function home() {
    header();
    document.getElementById("content").innerHTML = "";
    // Creation content
    let content = document.getElementById("content");
    content.innerHTML = "" +
        "<div class='row'>" +
        "   <span class='col-md-1'></span>"+
        search_bar_complete().outerHTML +
        "   <span class='divider'></span>" +
        "   <span class='col-md-1'></span>" +
        "   <button type='button' id='organize_button' class='btn col-md-10'>Organiser un match</button>" +
        "</div>";
}
home();
