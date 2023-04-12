fetch("/movies").then(c => c.json()).then(movies => {
    console.log(movies);

    var labels = document.getElementsByTagName('label');
    var buttons = document.getElementsByTagName('button');
    for (let i = 0; i < 10; i++) {
        labels[i].innerText = "Movie " + movies[i].id;
        buttons[i].innerText = movies[i].title;
    }
});