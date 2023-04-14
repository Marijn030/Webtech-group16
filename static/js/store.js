//the select menu with all the moviescreenings
var select = document.getElementsByTagName('select')[0];
select.addEventListener('change', movieSelected, false);

//event handler for when a movie is selected
function movieSelected() {
    let label = document.getElementsByTagName('label')[1];
    label.innerText = "You selected moviescreening: " + select.value;
}

//the confirm button
var button = document.getElementsByTagName('button')[0];
button.addEventListener('click', orderTicket, false)

//event handler for when te confirm button is clicked
function orderTicket() {
    if (select.value.length == 1) {
        alert('Your order has been received, enjoy the movie!');
    }
    else {
        alert('Please select a moviescreening.');
    }    
}