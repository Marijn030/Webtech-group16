/*this script sets up the listener for the button that will load the next set of movies on index.html
*/
//first get the next button and add an event listener to it for when it gets clicked
var next = document.getElementsByTagName('button')[10];//the button that loads the next set of movies
next.addEventListener("click", nextMovie, false);

//then get the labels and the buttons for the movies
var labels = document.getElementsByTagName('label');//array with all the label elements, on which the names of the displayed on the page
var buttons = document.getElementsByTagName('button');//buttons which will lead to a page with the information for each of the displayed movies 

//then the event handler for when the next button gets clicked
function nextMovie() {//this loads the next set of movies by increasing the 'rank' number of the set and loading the set of movies associated with that
    var h3 = document.getElementsByTagName('h3')[0];//the header that tells the user what set they are on (which 10 movies)

    var text = String(h3.innerText);//the text that is contained in the defined header h3 element
    var strings = text.split(' ');//array where the text is split up so the current set can be retrieved off the html page

    var currentSet = parseInt(strings[1]) + 1;//gives the number associated with the current set increased by one
    var totalSets = parseInt(strings[3]);//number of total sets of movies in the database by retrieving off the page

    h3.innerText = "Set " + currentSet + " of " + totalSets;

    updatePage();
}

//a help function to update the page when the next button is clicked
function updatePage() {
    fetch("/movies").then(c => c.json()).then(movies => {
        console.log(movies);

        var h3 = document.getElementsByTagName('h3')[0];//the header that tells the user what set they are on (which 10 movies)
        var text = String(h3.innerText);//the text that is contained in the defined header h3 element
        var strings = text.split(' ');//array where the text in header is split up so the current set can be retrieved off the html page

        var currentSet = parseInt(strings[1]);//gives the number associated with the current set
        var totalSets = parseInt(Math.ceil(movies.length / 10));//number of total sets of movies in the database

        if (currentSet > totalSets) {
            currentSet = 1;
        }

        h3.innerText = "Set " + currentSet + " of " + totalSets;

        var increment = currentSet - 1;//saves difference between first set and current set  
        var begin = 0 + 10 * increment;//the number associated with the first movie that needs to be displayed, in increments of 10 (e.g. 0, 10, 20 then 30, etc) 

        for (let i = begin; i < begin + 10; i++) {//counter variable
            if(movies[i]){
                labels[i % 10].innerText = "Movie " + (i+1);
                buttons[i % 10].innerText = movies[i].title;
                buttons[i % 10].setAttribute('id', movies[i].id);
                buttons[i % 10].setAttribute('style', 'visiblity:visible');
            }
            else{
                labels[i%10].innerText = "";
                buttons[i % 10].innerText = "";
                buttons[i % 10].setAttribute('id', "0");
                buttons[i % 10].setAttribute('style', 'display:none');
            }
        }
    });
}

//add event handlers to the buttons for when they get clicked
for (let i = 0; i < 10; i++) {
    buttons[i].addEventListener('click', loadMovie, false);
}

//the event handler for when a movie button get clicked
function loadMovie() {    
    var id = parseInt(this.getAttribute('id'));//the movie id saved in the page element

    window.location.href = "/clickedmovie/" + id;
}