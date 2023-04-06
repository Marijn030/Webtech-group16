fetch("/movies").then(c => c.json()).then(movies => {
    console.log(movies);
    for (const movie of movies) {
        console.log(typeof movie);
        const h1 = document.createElement("h1");
        h1.innerText = movie.title;
        document.querySelector(".container").appendChild(h1);
    }
});