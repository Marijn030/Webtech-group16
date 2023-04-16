/*This script loads 10 movies into the slots they go into on index.html with some information
it also renders the different parts about the button that loads the next 10 movies in the database
*/
//get all the movies to display on the home page index.html
fetch("/movies").then(c => c.json()).then(movies => {
    var h3 = document.getElementsByTagName('h3')[0];//the header that tells the user what set they are on (which 10 movies)
    var text = String(h3.innerText);//the text that is contained in the defined header h3 element
    var strings = text.split(' '); //array where the text is split up so the current set can be retrieved off the html page

    var currentSet = parseInt(strings[1]);//gives the number associated with the current set
    var totalSets = Math.ceil(movies.length / 10);//number of total sets of movies in the database

    if (currentSet > totalSets) {
        currentSet = 1;
    }

    h3.innerText = "Set " + currentSet + " of " + totalSets;

    var increment = currentSet - 1;//
    var begin = 0 + 10 * increment;//

    var labels = document.getElementsByTagName('label');
    var buttons = document.getElementsByTagName('button');
    for (let i = begin; i < begin+10; i++) {
        if(movies[i]){
            labels[i%10].innerText = "Movie " + (i+1);
            buttons[i % 10].innerText = movies[i].title;
            buttons[i % 10].setAttribute('id', movies[i].id);
            buttons[i % 10].setAttribute('style', 'visiblity:visible');
        }
        else{
            labels[i%10].innerText = "";
            buttons[i % 10].innerText = "";
            buttons[i % 10].setAttribute('id', "");
            buttons[i % 10].setAttribute('style', 'display:none');
        }
    }
});
