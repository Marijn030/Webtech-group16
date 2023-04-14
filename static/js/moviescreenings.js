//get all the moviescreenings to display on the home page index.html
fetch("/moviescreenings").then(c => c.json()).then(moviescreenings => {
    console.log(moviescreenings);

    var select = document.getElementsByTagName('select')[0];
    for (let i = 0; i < moviescreenings.length; i++) {
        let option = document.createElement('option');        
        option.setAttribute('value', moviescreenings[i].id)
        let text = document.createTextNode("Movie " + moviescreenings[i].movie_id + " at " + moviescreenings[i].datetime);
        option.appendChild(text);
        select.appendChild(option);
    }
});
