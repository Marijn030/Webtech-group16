//This script loads all movies into the dropdown in store.html
fetch("/group16/movies").then(c => c.json()).then(movies => {
    var select = document.getElementsByTagName('select')[0];//the dropdown on the store page for movies 

    let option = document.createElement('option');//first option that is shown in the dropdown
    option.setAttribute('value', "")
    let text = document.createTextNode("--Select a movie--");//text for the first option
    option.appendChild(text);
    select.appendChild(option);

    for (let i = 0; i < movies.length; i++) {//counter variable
        let option = document.createElement('option');//creates a new option for the next movie
        option.setAttribute('value', movies[i].id);
        let text = document.createTextNode("Movie " + movies[i].id + ": " + movies[i].title);//text for the newly created option
        option.appendChild(text);
        select.appendChild(option);
    }
});