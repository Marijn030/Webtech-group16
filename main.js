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
app.use(session({secret : "secret"}));

//var db = new sqlite3.Database("cinema");

//adding listening
app.get("/", function(req, res){
    const {userId} = req.session;
    console.log(userId);
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
app.post("/login", async function(req, res){
    const password = req.body.password;
    const login = req.body.userlogin;
    function getUserByLogin(login){
        const db = new sqlite3.Database("cinema");
        return new Promise((resolve, reject) => {
            db.serialize(function () {
                db.get("SELECT * FROM user WHERE user.login = ?", [login], (err, rows) => {
                    if(err){ return reject(err);}
                    return resolve(rows); //returns JSON object
                });
            })
            db.close();
        })
    }
    var user = await getUserByLogin(login);
    console.log(user);
    if(!user || user.password !== password){
        res.setHeader('Content-type','text/html')
        return res.send('<p> Incorrect password or username. </p> <a href="/login"> Retry </a>');
    }
    else{
        req.session.userId = user.id;
    }
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
    const name = req.body.name; 
    const email = req.body.email;
    const login = req.body.login; console.log(login);
    const pw = req.body.password; console.log(pw);
    const address = req.body.address;
    const ccard = req.body.credit;
    if(!name || !email || !login || !pw || !address || !ccard){
        res.send('<p> Invalid input. </p> <a href="/register"> Retry </a>');
    }
    else{
        function insertUser(n, e, l, p, a, c){
            const db = new sqlite3.Database("cinema");
            return new Promise((resolve, reject) => {
                db.serialize(function () {
                    db.run("INSERT INTO user (name, email, login, password, address, creditcard) VALUES (?, ?, ?, ?, ?, ?)", [n, e, l, p, a, c], function(err){
                        if(err){return reject(err);}
                        else{console.log(this.lastID); return resolve(this.lastID);}
                    });
                })
                db.close();
            });
        }
        function getUserById(userId){
            const db = new sqlite3.Database("cinema");
            return new Promise((resolve, reject) => {
                db.serialize(function () {
                    db.get("SELECT * FROM user WHERE user.id = ?", [userId], (err, rows) => {
                        if(err){ return reject(err);}
                        return resolve(rows); //returns JSON object
                    });
                })
                db.close();
            })
        }
        var user = await insertUser(name, email, login, pw, address, ccard).then(insertId => {return getUserById(insertId)});
        req.session.userId = user.id;
        return res.redirect('/register');
    }
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