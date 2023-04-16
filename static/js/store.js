/*This script makes the label that shows the selected movie react to changing the dropdown's selected movie
and it makes the button react to being pressed, so the information is passed to the server
*/
//the select menu with all the moviescreenings
var select = document.getElementsByTagName('select')[0];//gets the dropdown element in the webpage file
select.addEventListener('change', movieSelected, false);

//event handler for when a movie is selected
function movieSelected() {//updates the movie in the label with the value of the dropdown item
    let label = document.getElementsByTagName('label')[1];//gets the label that shows the selected movie
    label.innerText = "You selected moviescreening: " + select.value;
}

//the confirm button
var button = document.getElementsByTagName('button')[0];//the button on the webpage that will submit the data
button.addEventListener('click', orderTicket, false)

//event handler for when te confirm button is clicked
function orderTicket() {//sends the information to the database when the user wants to order tickets
    if (select.value.length) {
        alert('Your order has been received, enjoy the movie!');
    }
    else {
        alert('Please select a moviescreening.');
    }    
}