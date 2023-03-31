var express = require('express');
var app = express();
var file = "cinema.db";
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(file);

var movieDirector;

db.serialize(function () {
    var name;
    db.each("SELECT directorname FROM director WHERE directorname LIKE 'Chad Stahelski'", function (err, row) {
        name = row.directorname;
    });
    var year;
    db.each("SELECT birthyear FROM director WHERE directorname LIKE 'Chad Stahelski'", function (err, row) {
        year = row.birthyear;
    });
    var moviesDirected;
    db.each("SELECT movies FROM director WHERE directorname LIKE 'Chad Stahelski'", function (err, row) {
        moviesDirected = row.movies;
    });
    var movies = moviesDirected.Split("-");
    movieDirector = new director(name, year, movies); 
})

db.close();

//class for the whole movie
class movie {
    constructor(title, genre, year, director, writerArray, actorArray, poster, trailer, plot) {
        this.title = title;
        this.genre = genre;
        this.releaseYear = year;
        this.writers = writerArray;
        this.stars = actorArray;
        this.poster = poster;
        this.trailer = trailer;
        this.plot = plot;
        this.itsDirector = director;
    }
}

//top class, will have subclasses
class artist {
    constructor(name, birthYear) {
        this.name = name;
        this.birthYear = birthYear;
    }
}

class director extends artist {
    constructor(name, birthYear, directedList) {
        super(name, birthYear);
        this.directedMovies = directedList; //a list of movies that this director has also directd
    }
}

class writer extends artist {
    constructor(name, birthYear, writtenList) {
        super(name, birthYear);
        this.writtenWorks = writtenList;//array of earlier works
    }
}

class actor extends artist {
    constructor(name, birthYear, starredList, photo) {
        super(name, birthYear);
        this.starredMovies = starredList; //movies in which they previously starred
        this.photo = photo;
    }
}

//Declaring different actors and getting the information set up
var wickDirector = new director("Chad Stahelski", 1968, ["John Wick: Chapter 2", "John Wick: Chapter 3 - Parabellum"]);

var protagonist = new actor("Keanu Reeves", 1964,
    ["Bill & Ted's Bogus Adventure", "Point Break", "Speed", "Johnny Mnemonic"], "../images/john-wick.jpeg");

var badGuy = new actor("Mikeal Nycvist", 1960,
    ["Together", "Grabben i graven bredvid", "As It is in Heaven"], "../images/viggo-tarasov.jpg");

var badTeen = new actor("Alfie Allen", 1986,
    ["Elizabeth", "Atonement", "Confine"], "../images/iosef-tarasov.jpg");

var femaleChallenger = new actor("Adrianne Palicki", 1983,
    ["Getting Rachel Back", "Legion", "Coffee Town", "Dr. Cabbie"], "../images/Ms.-perkins.jpg");

var deadWife = new actor("Bridget Moynahan", 1971,
    ["The Recruit", "I, Robot", "Prey", "Battle: Los Angeles"], "../images/helen-wick.jpg");

var mainWriter = new writer("Derek Kolstad", 1974, ["One in the Chamber", "The Package", "John Wick: Chapter 2", "John Wick: Chapter 3 - Parabellum"]);

//declarations leading up to the movie variable, putting the final pieces together
var johnWickActors = [protagonist, badGuy, badTeen, femaleChallenger, deadWife];
var johnWickWriters = [mainWriter];

var movieJohnWick = new movie("John Wick", "action-thriller", 2014, movieDirector, johnWickWriters,
    johnWickActors, "../images/john_wick_movieposter.jpg",
    "https://www.youtube.com/embed/2AUmvWm5ZDQ",
    "Legendary assassin John Wick (Keanu Reeves) retired from his violent career after marrying the love of his life. Her sudden death leaves John in deep mourning. When sadistic mobster Iosef Tarasov (Alfie Allen) and his thugs steal John's prized car and kill the puppy that was a last gift from his wife, John unleashes the remorseless killing machine within and seeks vengeance. Meanwhile, Iosef's father (Michael Nyqvist) -- John's former colleague -- puts a huge bounty on John's head. (Source: John Wick page on Rotten Tomatoes)");

//function declarations

/*this function takes the actor class that contains all that information 
and the node that needs to contain this information
 and creates a node that should contain all information of that one actor 
 */
function addingActorContent(addingNode, actor) {
    var newSection = document.createElement('section');

    //add all movies to a string for tooltip on names and images
    let allMovies = stringArrayToListing(actor.starredMovies);

    var characterHeading = document.createElement('h4'); //level of heading unknown just for now //this line gives an error in createElement('');
    var headingText = document.createTextNode(actor.name);
    characterHeading.appendChild(headingText);
    characterHeading.setAttribute('title', allMovies);//change tooltip
    newSection.appendChild(characterHeading);

    var mainContent = document.createElement('p');
    var contentString = actor.name + " was born in " + actor.birthYear + ".";
    var contentText = document.createTextNode(contentString);
    mainContent.appendChild(contentText);
    newSection.appendChild(mainContent);

    var photoNode = document.createElement('img');//img already good, so no need for a class
    photoNode.setAttribute('src', actor.photo);
    photoNode.setAttribute('title', allMovies);//change tooltip
    newSection.appendChild(photoNode);

    //a part that contains all extra info
    let hiddenInfo = document.createElement('p');
    let hiddenString = " They starred in " + allMovies + ".";
    let hiddenTextNode = document.createTextNode(hiddenString);
    hiddenInfo.appendChild(hiddenTextNode);
    mainContent.appendChild(hiddenInfo);
    hiddenInfo.style.display = "none";

    //hover reveals extra information
    mainContent.addEventListener("mouseover", () => { hiddenInfo.style.display = "inline"; }, true);
    mainContent.addEventListener("mouseout", () => { hiddenInfo.style.display = "none"; }, true);
    photoNode.addEventListener("mouseover", () => { hiddenInfo.style.display = "inline"; }, true);
    photoNode.addEventListener("mouseout", () => { hiddenInfo.style.display = "none"; }, true);

    addingNode.appendChild(newSection);
}

//adds the part with all information of the director
//takes the node to attach all things and the director
function addDirectorPart(addingNode, director) {
    let newParagraph = document.createElement('p');
    let paragraphString = director.name + ", born in " + director.birthYear + ".";
    let stringNode = document.createTextNode(paragraphString);
    newParagraph.appendChild(stringNode);
    newParagraph.style.display = "inline";

    let hiddenInfo = document.createElement('p');
    let hiddenString = " They also directed " + stringArrayToListing(director.directedMovies) + ".";
    let hiddenTextNode = document.createTextNode(hiddenString);
    hiddenInfo.appendChild(hiddenTextNode);
    newParagraph.appendChild(hiddenInfo);
    hiddenInfo.style.display = "none";

    newParagraph.addEventListener("mouseover", () => { hiddenInfo.style.display = "inline"; }, true);
    newParagraph.addEventListener("mouseout", () => { hiddenInfo.style.display = "none"; }, true);

    addingNode.appendChild(newParagraph);
}

//adds the part with all information of one writer
//takes the node to attach all things, the writer and a boolean whether the writer is the last in the array
function addWriterPart(addingNode, writer, positionLast) {
    let newParagraph = document.createElement('p');
    let firstString = writer.name + ", born in " + writer.birthYear;

    //determining what kind of string is necessary, based on the position in the writersArray
    if (positionLast) {
        var paragraphString = " & " + firstString;

    } else if (writer == movieJohnWick.writers[0]) {
        var paragraphString = firstString;
    } else {
        var paragraphString = ", " + firstString;
    }

    let stringNode = document.createTextNode(paragraphString);
    newParagraph.appendChild(stringNode);
    newParagraph.style.display = "inline";

    let hiddenInfo = document.createElement('p');
    let hiddenString = ", who has also written " + stringArrayToListing(writer.writtenWorks);
    let hiddenTextNode = document.createTextNode(hiddenString);
    hiddenInfo.appendChild(hiddenTextNode);
    newParagraph.appendChild(hiddenInfo);
    hiddenInfo.style.display = "none";

    newParagraph.addEventListener("mouseover", () => { hiddenInfo.style.display = "inline"; }, true);
    newParagraph.addEventListener("mouseout", () => { hiddenInfo.style.display = "none"; }, true);

    addingNode.appendChild(newParagraph);
}

//function turns array of strings (more than one) into one listing string
function stringArrayToListing(array) {
    var stringResult = array[0]; //add a string to the first part of the array to attempt to force the value to be a string
    for (let i = 1; i < array.length; i++) {
        if (i == array.length - 1) {
            stringResult += " & " + array[i];
        } else {
            stringResult += ", " + array[i];
        }
    }
    return stringResult;
}

//get the head element
let head = document.getElementsByTagName('head')[0];

//add a meta for charset in head
let metaCharset = document.createElement('meta');
metaCharset.setAttribute('charset', 'UTF-8');
head.appendChild(metaCharset);

//add a title in head
let title = document.createElement('title');
let textNode = document.createTextNode('Short version page');
title.appendChild(textNode);
head.appendChild(title);

//add a meta for viewport in head
let metaViewport = document.createElement('meta');
metaViewport.setAttribute('name', 'viewport');
metaViewport.setAttribute('content', 'width=device-width, initial-scale = 1.0');
head.appendChild(metaViewport);

//add a link to the css file in head
let link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', '../css/general.css');
head.appendChild(link);

//add a comment in head
let headComment = document.createComment('meta data for assisting search engines');
head.appendChild(headComment);

//add a meta for keywords in head
let metaKeywords = document.createElement('meta');
metaKeywords.setAttribute('name', 'keywords');
metaKeywords.setAttribute('content', 'title, genre, year, director, writer, actor, John Wick, action, 2014');
head.appendChild(metaKeywords);

//add a meta for description in head
let metaDescription = document.createElement('meta');
metaDescription.setAttribute('name', 'description');
metaDescription.setAttribute('content', 'Take a look at a short version of all the information about the movie John Wick!');
head.appendChild(metaDescription);

//add a meta for author in head
let metaAuthor = document.createElement('meta');
metaAuthor.setAttribute('name', 'author');
metaAuthor.setAttribute('content', 'Taylan Batman, Jonathan van Dijk, Marijn Luime');
head.appendChild(metaAuthor);

//get the header element
let header = document.getElementsByTagName('header')[0];

//add a h1 in header before the menu label
let h1 = document.createElement('h1');
let h1Text = document.createTextNode(movieJohnWick.title);
h1.appendChild(h1Text);
let label = document.getElementsByTagName('label')[0];
header.insertBefore(h1, label);

//adding the articles
let articleGeneralInfo = document.createElement('article');
var articleCharacterInfo = document.createElement('article');
let mainTag = document.getElementsByTagName('main')[0];
mainTag.appendChild(articleGeneralInfo);
mainTag.appendChild(articleCharacterInfo);

//start adding the general information of the movie
var informationHeading = document.createElement('h3');
let movieTitle = document.createTextNode(movieJohnWick.title);
informationHeading.appendChild(movieTitle);
articleGeneralInfo.appendChild(informationHeading);

/*Add first paragraph for general information
Strings will contain all info necessary for the introduction
*/
var introParagraph = document.createElement('p');

//fill in the intro paragraph
let introStringPart1 = movieJohnWick.title + " is an " + movieJohnWick.genre +
    " film released in " + movieJohnWick.releaseYear + ". It was directed by ";
let introText1 = document.createTextNode(introStringPart1);
introParagraph.appendChild(introText1);

//Fill in director information
addDirectorPart(introParagraph, movieJohnWick.itsDirector);

//the part for the writers
let introStringPart2 = " The movie was written by ";
let introText2 = document.createTextNode(introStringPart2);
introParagraph.appendChild(introText2);

//adds all information of the writers one by one
for (let writer of movieJohnWick.writers) {
    if (writer == movieJohnWick.writers[movieJohnWick.writers.length - 1] && movieJohnWick.writers.length > 1)
        addWriterPart(introParagraph, writer, true);
    else
        addWriterPart(introParagraph, writer, false);
}

//ending the article proper
let introStringPart3 = ".";
let introText3 = document.createTextNode(introStringPart3);
introParagraph.appendChild(introText3);

articleGeneralInfo.appendChild(introParagraph);


//Adding to the article with characterinfo
//adds all actors to the web page
for (let starringActor of movieJohnWick.stars) {
    addingActorContent(articleCharacterInfo, starringActor);
}

//add an article with the poster
let articlePoster = document.createElement('article');

let h3Poster = document.createElement('h3')
let h3PosterText = document.createTextNode('Poster');
h3Poster.appendChild(h3PosterText);
articlePoster.appendChild(h3Poster);

let aPoster = document.createElement('a');
aPoster.setAttribute('href', movieJohnWick.poster);
aPoster.setAttribute('target', '_blank');
aPosterText = document.createTextNode('Here, you can find the poster');
aPoster.appendChild(aPosterText);
aPoster.style.color = 'darkblue';
articlePoster.appendChild(aPoster);

mainTag.appendChild(articlePoster);

//add an article with the trailer
let articleTrailer = document.createElement('article');

let h3Trailer = document.createElement('h3')
let h3TrailerText = document.createTextNode('Trailer');
h3Trailer.appendChild(h3TrailerText);
articleTrailer.appendChild(h3Trailer);

let aTrailer = document.createElement('a');
aTrailer.setAttribute('href', movieJohnWick.trailer);
aTrailer.setAttribute('target', '_blank');
aTrailerText = document.createTextNode('Here, you can find the trailer');
aTrailer.appendChild(aTrailerText);
aTrailer.style.color = 'darkblue';
articleTrailer.appendChild(aTrailer);

mainTag.appendChild(articleTrailer);

//add an article with the plot
let articlePlot = document.createElement('article');

let h3Plot = document.createElement('h3');
let h3PlotText = document.createTextNode('Plot');
h3Plot.appendChild(h3PlotText);
articlePlot.appendChild(h3Plot);

let h3p = document.createElement('p');
let h3Text = document.createTextNode(movieJohnWick.plot);
h3p.appendChild(h3Text);
articlePlot.appendChild(h3p);

mainTag.appendChild(articlePlot);



