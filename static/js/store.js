/*This script makes the label that shows the selected movie react to changing the dropdown's selected movie
and it makes the button react to being pressed, so the information is passed to the server
*/
//the select menu with all the moviescreenings
var select = document.getElementsByTagName('select')[0];//gets the dropdown element in the webpage file for movies
select.addEventListener('change', movieSelected, false);

//event handler for when a movie is selected
function movieSelected() {//updates the movie in the label with the value of the dropdown item
    let label = document.getElementsByTagName('label')[1];//gets the label that shows the selected movie
    label.innerText = "You selected the movie: " + select.value;

    fetch("/moviescreenings").then(c => c.json()).then(moviescreenings => {  
        var select2 = document.getElementsByTagName('select')[1];
        const length = select2.length-1;
        for (let i = length; i >= 0; i--) {
            select2.remove(i);
        }

        let option = document.createElement('option');
        option.setAttribute('value', "")
        let text = document.createTextNode("--Select a moviescreening--");
        option.appendChild(text);
        select2.appendChild(option);

        for (let i = 0; i < moviescreenings.length; i++) {
            if (select.value == moviescreenings[i].movie_id) {
                let option = document.createElement('option');
                option.setAttribute('value', moviescreenings[i].id)
                let text = document.createTextNode("Moviescreening " + moviescreenings[i].id + " at: " + moviescreenings[i].datetime);
                option.appendChild(text);
                select2.appendChild(option);
            }
        }
    });
}

var select2 = document.getElementsByTagName('select')[1];//gets the dropdown element in the webpage file for dates
select2.addEventListener('change', moviescreeningSelected, false);

//event handler for when a moviescreening is selected
function moviescreeningSelected() {//updates the moviescreening in the label with the value of the dropdown item
    let label = document.getElementsByTagName('label')[3];//gets the label that shows the selected moviescreening
    label.innerText = "You selected the moviescreening: " + select2.value;
    let input = document.getElementById('moviescreeningid');
    input.value = select2.value;
}
