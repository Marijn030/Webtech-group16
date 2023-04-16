//get all the moviescreenings linked with a specific movie here
fetch("/moviescreenings").then(c => c.json()).then(moviescreenings => {
    console.log(moviescreenings);

/*    var select = document.getElementsByTagName('select')[0];
    let option = document.createElement('option');  
    option.setAttribute('value', "")
    let text = document.createTextNode("--Select a movie--");
    option.appendChild(text);
    select.appendChild(option);
    for (let i = 0; i < moviescreenings.length; i++) {
        let option = document.createElement('option');        
        option.setAttribute('value', moviescreenings[i].id)
        let text = document.createTextNode("Movie " + moviescreenings[i].movie_id + " at " + moviescreenings[i].datetime);
        option.appendChild(text);
        select.appendChild(option);
    }
*/
});
