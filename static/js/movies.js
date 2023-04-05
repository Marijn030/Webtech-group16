fetch("/movies").then(c => c.json()).then(movies => {
    console.log(movies);
    for (const movie of movies) {
        const h1 = document.createElement("h1");
        h1.innerText = movie.title;
        document.getElementsByTagName("h2")[0].appendChild(h1);
    }
});
