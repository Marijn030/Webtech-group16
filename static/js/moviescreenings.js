//get all the moviescreenings to display on the home page index.html
fetch("/moviescreenings").then(c => c.json()).then(moviescreenings => {
    console.log(moviescreenings);

    var select = document.getElementsByTagName('select')[0];
    for (moviescreening in moviescreenings) {
        let option = document.createElement('option');        
        option.setAttribute('value', moviescreening.id)
        let text = document.createTextNode("Movie " + moviescreening.movie_id + " at " + moviescreening.datetime);
        option.appendChild(text);
        select.appendChild(option);
    }
});
