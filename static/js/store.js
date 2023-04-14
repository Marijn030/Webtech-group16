//the select menu with all the moviescreenings
var select = document.getElementsByTagName('select')[0];
select.addEventListener("change", movieSelected, false);

function movieSelected() {
    let label = document.getElementsByTagName('label')[1];
    label.innerText = "You selected the moviescreening: " + select.value;
}