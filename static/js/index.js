//first get the next button and add an event listener to it for when it gets clicked
var next = document.getElementsByTagName('button')[10];
next.addEventListener("click", nextMovie, false);

//then get the labels and the buttons for the movies
var labels = document.getElementsByTagName('label');
var buttons = document.getElementsByTagName('button');

//then the event handler for when the next button gets clicked
function nextMovie() {
    var h3 = document.getElementsByTagName('h3')[0];

    var text = String(h3.innerText);
    var strings = text.split(' ');

    var currentSet = parseInt(strings[1])+1;
    var totalSets = parseInt(strings[3]);

    h3.innerText = "Set " + currentSet + " of " + totalSets;

    updatePage();
}

//a help function to update the page when the next button is clicked
function updatePage() {
    fetch("/movies").then(c => c.json()).then(movies => {
        console.log(movies);

        var h3 = document.getElementsByTagName('h3')[0];
        var text = String(h3.innerText);
        var strings = text.split(' ');

        var currentSet = parseInt(strings[1]);
        var totalSets = parseInt(Math.ceil(movies.length / 10));

        if (currentSet > totalSets) {
            currentSet = 1;
        }

        var h3 = document.getElementsByTagName('h3')[0];
        h3.innerText = "Set " + currentSet + " of " + totalSets;

        var increment = currentSet - 1;
        var begin = 0 + 10 * increment;

        for (let i = begin; i < begin + 10; i++) {
            if(movies[i]){
                labels[i % 10].innerText = "Movie " + (i+1);
                buttons[i % 10].innerText = movies[i].title;
                buttons[i % 10].setAttribute('id', movies[i].id);
                buttons[i % 10].setAttribute('style', 'visiblity:visible');
            }
            else{
                labels[i%10].innerText = "";
                buttons[i % 10].innerText = "";
                buttons[i % 10].setAttribute('style', 'display:none');
            }
        }
    });
}

//add event handlers to the buttons for when they get clicked
for (let i = 0; i < 10; i++) {
    buttons[i].addEventListener('click', loadMovie, false);
}

//the event handler for when the movie buttons get clicked
function loadMovie() {    
    var id = parseInt(this.getAttribute('id'));
    console.log(id);

    window.location.href = "/clickedmovie/" + id;
}