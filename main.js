//declaring different middlewares to use
var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require("path");
var fs = require("fs");
var url = require('url');
var sqlite3 = require("sqlite3");
var pug = require("pug");
const { error, dir } = require('console');

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}
app.use(logger);
app.set("views", path.resolve(__dirname, "views")); 
app.set("view engine", "pug");


//NOTE TO SELF: IN ORDER TO MAKE CLICK IMG --> USE app.get("/moviedesc/:movid", function(req, res){}). THEN REDIRECT TO THIS PAGE WITH CORRECT ID BASED ON ID IN DB! 
//IN THIS CASE READFILE GENERAL PAGE SETUP + INSERT DATA BASED ON QUERY IN URL.
//NOTE TO SELF 2: IN ORDER TO MAKE PAGINATION --> USE app.get("/movielist/:pagenr", function(req, res){}) THEN TAKE MOVIES IN [n*pagenr*10, n+1*pagenr*10]!
//FIRST 10 MOVIES POSTED ON INDEX.

//adding listening
app.get("/", function(req, res){
    fs.readFile('static/web_pages/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
        //can be visited at http://localhost:8016
    });
});
app.get("/movies", (req, res) => {
    var db = new sqlite3.Database("cinema");
    db.serialize(function () {
        db.all("SELECT * FROM movie", (err, rows) => {
            res.json(rows);
        });
    })
    db.close();
});
app.get("/moviescreenings", (req, res) => {
    var db = new sqlite3.Database("cinema");
    db.serialize(function () {
        db.all("SELECT * FROM moviescreening", (err, rows) => {
            res.json(rows);
        });
    })
    db.close();
});
app.get("/userprofile", function (req, res) {
    fs.readFile('static/web_pages/userprofile.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
        //can be visited at http://localhost:8016
    });
});

app.get("/clickedmovie/:movid", function (req, res) {
    try{
        var movid = parseInt(req.params.movid, 10);
        const db = new sqlite3.Database("cinema");
        var title, genre, year, director, writer, actor, post, trail, pl;
        db.serialize(function() {
            db.each("SELECT title AS titl FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next("error while fetching from database");}
                else{title = rows.titl;}
            });
            db.each("SELECT genre AS genr FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next("error while fetching from database");}
                else {genre = rows.genr;}
            });
            db.each("SELECT year AS yea FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next("error while fetching from database");}
                else {year = rows.yea;}
            });
            db.each("SELECT director AS directo FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next("error while fetching from database");}
                else {director = rows.directo;}
            });
            db.each("SELECT writer AS write FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next("error while fetching from database");}
                else {writer = rows.write;}
            });
            db.each("SELECT actor AS acto FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next("error while fetching from database");}
                else {actor = rows.acto;}
            });
            db.each("SELECT poster AS poste FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next("error while fetching from database");}
                else {post = rows.poste;}
            });
            db.each("SELECT trailer AS traile FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next("error while fetching from database");}
                else {trail = rows.traile;}
            });
            db.each("SELECT plot AS plo FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next("error while fetching from database");}
                else {pl = rows.plo; res.render('movieinfo', {movietitle:title, moviegenre:genre, movieyear:year, moviedirector:director, moviewriter:writer,
                    actors: actor, poster:post, trailer:trail, plot:pl});} 
            });
        });
        db.close();
    }
    catch{next(new Error("invalid url"))}
});


var staticPath = path.join(__dirname, "/static");
app.use(express.static(staticPath)); //makes you able to acces static files such as the css/img/js. NOTE: HTML/PUG isn't static because we pull data from DB. 
//However tag-only HTML is considered static, since the tags themselves are consistent.
//can be visited at http://localhost:8016/web_pages/index.html or http://localhost:8016/css/general.css
app.listen(8016);

