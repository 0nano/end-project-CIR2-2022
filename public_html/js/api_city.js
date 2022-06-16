function find_city_la_poste(insee){
    $.ajax(//use ajax to https://datanova.laposte.fr/api/v2/
        {
            method: 'GET',
            url: "https://datanova.laposte.fr/api/records/1.0/search/?dataset=laposte_hexasmal&q=" +
                insee +
                "&lang=fr&facet=code_commune_insee",
            success: function (city) {
                return city.records[0].fields.nom_de_la_commune;
            }
        });
}


/**
 * Attention, ne fonctionne que pour l'id -> city
 * https://www.codingnepalweb.com/search-bar-autocomplete-search-suggestions-javascript/
 */
function auto_complete() {
    let autocomplete = document.createElement("div");
    autocomplete.className = "autocom-box";
    let suggestion = document.createElement("ul");
    suggestion.id = 'suggestions';
    autocomplete.append(suggestion);
    let city = document.getElementById('city');
    city.addEventListener("keyup", function () {
        let suggestion = $('#suggestions');
        suggestion.html("");
        console.log("Envoi de la request ajax vers laposte");
        $.ajax(//use ajax to https://datanova.laposte.fr/api/v2/
            {
                method: 'GET',
                url: "https://datanova.laposte.fr/api/records/1.0/search/?dataset=laposte_hexasmal&q="+
                    city.value +
                    "&lang=fr&facet=code_commune_insee",
                success: function (cities) {
                    cities.records.forEach(function (city, index) {
                        console.log(cities.records[index]["fields"]["nom_de_la_commune"]);
                        if (index < 1 || city.fields.nom_de_la_commune != cities.records[index - 1]["fields"]["nom_de_la_commune"]){
                            let a_city = document.createElement("li");
                            a_city.innerHTML = city.fields.nom_de_la_commune + " (" + city.fields.code_postal + ")";
                            a_city.value = city.fields.code_commune_insee;
                            suggestion.append(a_city);
                            a_city.addEventListener("click", function () {
                                city.value = city.fields.nom_de_la_commune + " (" + city.fields.code_postal + ")";
                                city.setAttribute('insee', city.fields.code_commune_insee);
                                suggestion.html("");
                            });
                        }else if ( city.fields.nom_de_la_commune != cities.records[index - 1]["fields"]["nom_de_la_commune"]) {
                            let a_city = document.createElement("li");
                            a_city.innerHTML = city.fields.nom_de_la_commune + " (" + city.fields.code_postal + ")";
                            a_city.value = city.fields.code_commune_insee;
                            suggestion.append(a_city);
                            a_city.addEventListener("click", function () {
                                city.value = city.fields.nom_de_la_commune + " (" + city.fields.code_postal + ")";
                                city.setAttribute('insee', city.fields.code_commune_insee);
                                suggestion.html("");
                            });/** TODO réessayer demain pour réarranger puis supprimer **/
                        }
                    });
                }
            }
        )
    });
    return autocomplete;
}