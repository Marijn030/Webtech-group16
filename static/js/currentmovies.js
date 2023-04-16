//This script loads all movies into store.html
fetch("/movies").then(c => c.json()).then(movies => {
    var select = document.getElementsByTagName('select')[0];

    let option = document.createElement('option');
    option.setAttribute('value', "")
    let text = document.createTextNode("--Select a movie--");
    option.appendChild(text);
    select.appendChild(option);

    for (let i = 0; i < movies.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', movies[i].id)
        let text = document.createTextNode("Movie " + movies[i].id + ": " + movies[i].title);
        option.appendChild(text);
        select.appendChild(option);
    }
});