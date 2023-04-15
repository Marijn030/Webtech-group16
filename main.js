//declaring different middlewares to use
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require("path");
const fs = require("fs");
const url = require('url');
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require('bcrypt');
const session = require('express-session');
const pug = require("pug");

//setup for the server beforehand
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.urlencoded({extended: false}));
const staticPath = path.join(__dirname, "/static");
app.use(express.static(staticPath)); 
//makes you able to acces static files such as the css/img/js. NOTE: HTML/PUG isn't static because we pull data from DB.
//However tag-only HTML is considered static, since the tags themselves are consistent.
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");

//var db = new sqlite3.Database("cinema");

//adding listening
app.get("/", function(req, res){
    fs.readFile('static/web_pages/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

app.get("/home", function(req,res){
    res.redirect('/');
    res.end();

});
app.get("/movies", (req, res) => {
    var db = new sqlite3.Database("cinema");
    db.serialize(function () {
        db.all("SELECT title AS title, movie.id AS id FROM moviescreening, movie WHERE movie.id = moviescreening.movie_id AND strftime('%s', 'now') < strftime('%s', datetime)", (err, rows) => {
            res.json(rows);
        });
    })
    db.close();
});

app.get("/moviescreenings", (req, res) => {
    var db = new sqlite3.Database("cinema");
    db.serialize(function () {
        db.all("SELECT * FROM moviescreening WHERE strftime('%s', 'now') < strftime('%s', moviescreening.datetime)", (err, rows) => {
            res.json(rows);
        });
    })
    db.close();
});

app.get("/profile", isLoggedIn, function (req, res) {
    fs.readFile('static/web_pages/userprofile.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
});
app.get("/store", function (req, res) {
    fs.readFile('static/web_pages/store.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
});

app.get("/clickedmovie/:movid", function (req, res, next) {
        if(!parseInt(req.params.movid, 10)){return(next(new Error("Invalid url.")));}
        var movid = parseInt(req.params.movid, 10);
        const db = new sqlite3.Database("cinema");
        var title, genre, year, director, writer, actor, post, trail, pl;
        db.serialize(function() {
            db.get("SELECT * FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next(new Error("Fetching from database failed."));}
                else if(!rows){next(new Error("Movie wasn't found in database."));}
                else{title = rows.title; genre = rows.genre; year = rows.year; director = rows.director; writer = rows.writer; actor = rows.actor; post = rows.poster; trail = rows.trailer; pl = rows.plot;
                    res.render('movieinfo', {movietitle:title, moviegenre:genre, movieyear:year, moviedirector:director, moviewriter:writer,
                    actors: actor, poster:post, trailer:trail, plot:pl});}
            });
        });
        db.close();
});
//login part
app.get("/login", function (req, res) {
    fs.readFile('static/web_pages/login.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
});
app.post("/login", function(req, res){
    const password = req.body.password;
    const login = req.body.userlogin;
    
});
//register part
app.get("/register", function (req, res) {
    fs.readFile('static/web_pages/register.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
});
app.post("/register", async (req, res) => {
    var db = new sqlite3.Database("cinema");
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        res.redirect('/login');
    } catch(e){
        res.redirect('/register');
        
    }

    res.end();
    db.close();
});



function isLoggedIn(req, res, next){
    return next();

}

//event listener for if the server shuts down?
/*process.on('SIGINT', () => {
    db.close();
    server.close();
});*/

app.use(function(err, req, res, next){
    if(err.message){
        res.status(500).send("Error: " + err.message);
    }
    else{res.status(500).send('Something has failed!');}
    
})
app.listen(8016); //can be visited at http://localhost:8016/web_pages/index.html or http://localhost:8016/css/general.css