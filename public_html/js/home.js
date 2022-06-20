function home() {
    header();
    document.getElementById("errors").innerHTML = ""; //delete all error
    document.getElementById("content").innerHTML = "";
    // Creation content
    let content = document.getElementById("content");
    content.innerHTML = "" +
        "<div class='row'>" +
        "   <span class='col-md-1'></span>"+
        search_bar_complete().outerHTML +
        "   <span class='divider'></span>" +
        "   <span class='col-md-1'></span>" +
        "   <button type='button' id='organize_button' class='btn col-md-10 btn_other_option'>Organiser un match<img alt='icone création match' src='public_html/img/add_circle.svg' class='little_icon'></button>" +
        "</div>";
    listener_search();
}
//home();
