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

app.get("/clickedmovie/:movid", function (req, res) {
    try{
        var movid = parseInt(req.params.movid, 10);
        const db = new sqlite3.Database("cinema");
        var title, genre, year, director, writer, actor, post, trail, pl;
        db.serialize(function() {
            db.each("SELECT title AS titl FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next(new Error("error while fetching from database"));}
                else if(!rows){next(new Error("movie doesn't exist in database")); return 0}
                else{title = rows.titl;}
            });
            db.each("SELECT genre AS genr FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next(new Error("error while fetching from database"));}
                else {genre = rows.genr;}
            });
            db.each("SELECT year AS yea FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next(new Error("error while fetching from database"));}
                else {year = rows.yea;}
            });
            db.each("SELECT director AS directo FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next(new Error("error while fetching from database"));}
                else {director = rows.directo;}
            });
            db.each("SELECT writer AS write FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next(new Error("error while fetching from database"));}
                else {writer = rows.write;}
            });
            db.each("SELECT actor AS acto FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next(new Error("error while fetching from database"));}
                else {actor = rows.acto;}
            });
            db.each("SELECT poster AS poste FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next(new Error("error while fetching from database"));}
                else {post = rows.poste;}
            });
            db.each("SELECT trailer AS traile FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next(new Error("error while fetching from database"));}
                else {trail = rows.traile;}
            });
            db.each("SELECT plot AS plo FROM movie WHERE rowid = " + movid, (err, rows) => {
                if(err){next(new Error("error while fetching from database"));}
                else {pl = rows.plo; res.render('movieinfo', {movietitle:title, moviegenre:genre, movieyear:year, moviedirector:director, moviewriter:writer,
                    actors: actor, poster:post, trailer:trail, plot:pl});} 
            });
        });
        db.close();
    }
    catch{next(new Error("invalid url"))}
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
    var db = new sqlite3.Database("cinema");

    try{
        let  q = "SELECT password FROM users where login=?";
        db.query(q, [req.body.user, req.body.password], (err, rows) => {
            if (err) throw err;
            
            db.each("SELECT actor AS acto FROM movie WHERE rowid = " + movid, (err, rows) => {
                if (err) { next(new Error("error while fetching from database")); }
                else { actor = rows.acto; }
            });
        });
    } catch(e){


    }

    res.end();
    db.close();
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

app.use(function(err, req, res, next){
    if(err.message){
        res.status(500).send("Error: " + err.message);
    }
    res.status(500).send('Something has failed!');
})
app.listen(8016); //can be visited at http://localhost:8016/web_pages/index.html or http://localhost:8016/css/general.css

function isLoggedIn(req, res, next){
    return next();

}

//event listener for if the server shuts down?
/*process.on('SIGINT', () => {
    db.close();
    server.close();
});*/