//get all the movies to display on the home page index.html

fetch("/movies").then(c => c.json()).then(movies => {
    console.log(movies);

    var h3 = document.getElementsByTagName('h3')[0];
    var text = String(h3.innerText);
    var strings = text.split(' ');

    var currentSet = parseInt(strings[1]);
    var totalSets = parseInt(strings[3]);

    if (currentSet > totalSets) {
        currentSet = 1;
    }

    var h3 = document.getElementsByTagName('h3')[0];
    h3.innerText = "Set " + currentSet + " of " + totalSets;

    var increment = currentSet - 1;
    var begin = 0 + 10 * increment;

    var labels = document.getElementsByTagName('label');
    var buttons = document.getElementsByTagName('button');
    for (let i = begin; i < begin+10; i++) {
        labels[i%10].innerText = "Movie " + movies[i].id;
        buttons[i % 10].innerText = movies[i].title;
        buttons[i % 10].setAttribute('id', movies[i].id);
    }
});