//declaring different middlewares to use
var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require("path");
var fs = require("fs");
var url = require('url');
var sqlite3 = require("sqlite3");
var pug = require("pug")

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
    res.render('movieinfo', {movietitle:"John Wick: Chapter 4", moviegenre:"action-thriller", movieyear:"2023", moviedirector:"Chad Stahelski", moviewriter:"Derek Kolstad",
actors: "Keanu Reeves-Donnie Yen-Scott Adkins-Ian Mcshane-Bill Skarsgård", poster:"https://assets-prd.ignimgs.com/2023/02/08/jw4-2025x3000-online-character-1sht-keanu-v187-1675886090936.jpg",
trailer: "https://www.youtube.com/embed/qEVUtrk8_B4", plot: "Legendary assassin John Wick retired from his violent career after marrying the love of his life. Her sudden death leaves John in deep mourning. When sadistic mobster Iosef Tarasov and his thugs steal Johns prized car and kill the puppy that was a last gift from his wife,John unleashes the remorseless killing machine within and seeks vengeance. Meanwhile, Iosefs father -- Johns former colleague -- puts a huge bounty on Johns head."});
});


var staticPath = path.join(__dirname, "/static");
app.use(express.static(staticPath)); //makes you able to acces static files such as the css/img/js. NOTE: HTML/PUG isn't static because we pull data from DB. 
//However tag-only HTML is considered static, since the tags themselves are consistent.
//can be visited at http://localhost:8016/web_pages/index.html or http://localhost:8016/css/general.css
app.listen(8016);

