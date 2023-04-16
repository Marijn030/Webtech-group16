/*This file is where the express app and other middleware come together to receive and handle all the http request. This is the main file
of our server and connects all other files to each other and makes them work together.
*/
//declaring different middlewares to use
const express = require('express');//this variable is required to set up the express app
const app = express();//this is the express app that we add all other things to
const morgan = require('morgan');//this is the logger that we will be using
const path = require("path");//allows us to let the app know where all the information is
const fs = require("fs");//creates file streams to let us read and write files into/from the app
const sqlite3 = require("sqlite3").verbose();//allows for app-database communication
const session = require('express-session'); //manages and creates sessions for us to keep the state of server-client interaction   
const pug = require("pug");//allows us to read our templates for HTML

//setup for the server beforehand
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });// writes files to http communication so the client receives the proper page (interaction)
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.urlencoded({extended: false}));
const staticPath = path.join(__dirname, "/static");//sets our path for all static files
app.use(express.static(staticPath)); 
//makes you able to acces static files such as the css/img/js. NOTE: HTML/PUG isn't static because we pull data from DB.
//However tag-only HTML is considered static, since the tags themselves are consistent.
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");
app.use(session({secret : "secret"}));

//adding listening to http requests
//this handles the request for the home page
app.get("/", function(req, res){
    const {userId} = req.session;//pulls the session from the request into a local object
    if(!userId) {console.log("currently not logged in")}
    fs.readFile('static/web_pages/index.html', function(err, data) {//gives the user the home page
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});
//handles the request to see the movies in our database
app.get("/movies", (req, res) => {
    var db = new sqlite3.Database("cinema");
    db.serialize(function () {
        db.all("SELECT title AS title, movie.id AS id FROM moviescreening, movie WHERE movie.id = moviescreening.movie_id AND strftime('%s', 'now') < strftime('%s', datetime)", (err, rows) => {
            res.json(rows);
        });
    });
    db.close();
});

app.post("/moviescreenings", (req, res) => {
    var selectedMovieId = req.body.id;
    var db = new sqlite3.Database("cinema");
    db.serialize(function () {
        db.all("SELECT moviescreening.datetime FROM moviescreening WHERE strftime('%s', 'now') < strftime('%s', moviescreening.datetime) AND moviescreening.movie_id = ?", [selectedMovieId], (err, rows) => {
            res.json(rows);
        });
    });
    db.close();
});

app.get("/profile",  async function (req, res) {
    if(!req.session.userId){
        res.render('notification', {content : '<p> U are currently not logged in. Press the following link to log in: </p> <a href="/login"> Log in </a>'});
    }
    else{
        function getUserById(userId){
            const db = new sqlite3.Database("cinema");
            return new Promise((resolve, reject) => {
                db.serialize(function () {
                    db.get("SELECT * FROM user WHERE user.id = ?", [userId], (err, rows) => {
                        if(err){ return reject(err);}
                        return resolve(rows); //returns JSON object
                    });
                });
                db.close();
            });
        }
        function getOrderHistory(userId){
            const db = new sqlite3.Database("cinema");
            return new Promise((resolve, reject) => {
                db.serialize(function () {
                    db.all("SELECT title, datetime FROM orderhistory, moviescreening, movie WHERE orderhistory.user_id = ? AND moviescreening.id = orderhistory.moviescreening_id AND moviescreening.movie_id = movie.id", [userId], (err, rows) => {
                        if(err){ return reject(err);}
                        return resolve(rows); //returns JSON object
                    });
                })
                db.close();
            });
        }
        var user = await getUserById(req.session.userId);
        var orderhistory = await getOrderHistory(req.session.userId);
        var ohistory = "";
        for(let ticket of orderhistory){
            ohistory += "title: " + ticket.title + ", time of airing: " + ticket.datetime + ". <br> "; 
        }
        res.render('userprofile', {name : user.name, email : user.email, login : user.login, password : user.password, address : user.address, creditcard : user.creditcard, history : ohistory});    
    }
});

app.get("/store", function (req, res) {
    if(!req.session.userId){
        res.render('notification', {content : '<p> U are currently not logged in. Press the following link to log in: </p> <a href="/login"> Log in </a>'});
    }
    else{
        fs.readFile('static/web_pages/store.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
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
    if(req.session.userId){
        return res.render('notification', {content : '<p> U are already logged in. Press the following link to go back: </p> <a href="/"> Home </a>'});
    }
    else{
        fs.readFile('static/web_pages/login.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
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
        });
    }
    var user = await getUserByLogin(login);
    if(!user || user.password !== password){
        return res.render('notification', {content: '<p> Incorrect password or username. </p> <a href="/login"> Retry </a>'});
    }
    else{
        req.session.userId = user.id;
        return res.render('notification', {content: '<p> Login succeeded. </p> <a href="/"> Go back to homepage </a>'});
    }
});
//register part
app.get("/register", function (req, res) {
    if(req.session.userId){
        return res.render('notification', {content : '<p> U are already logged in. Press the following link to go back: </p> <a href="/"> Home </a>'});
    }
    else{
        fs.readFile('static/web_pages/register.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
});
app.post("/register", async (req, res) => {
    const name = req.body.name; 
    const email = req.body.email;
    const login = req.body.login;
    const pw = req.body.password;
    const address = req.body.address;
    const ccard = req.body.credit;
    if(!name || !email || !login || !pw || !address || !ccard){
        res.render('notification', {content: '<p> Invalid input. </p> <a href="/register"> Retry </a>'});
    }
    else{
        function insertUser(n, e, l, p, a, c){
            const db = new sqlite3.Database("cinema");
            return new Promise((resolve, reject) => {
                db.serialize(function () {
                    db.run("INSERT INTO user (name, email, login, password, address, creditcard) VALUES (?, ?, ?, ?, ?, ?)", [n, e, l, p, a, c], function(err){
                        if(err){return reject(err);}
                        else{return resolve(this.lastID);}
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
        return res.render('notification', {content: '<p> Account has been registered and u have been logged in. </p> <a href="/"> Go back to homepage </a>'});
    }
});

app.get("/logout", function (req, res) {
    if(!req.session.userId){
        res.render('notification', {content: '<p> U are currently not logged in. Press the following link to go back: </p> <a href="/"> Home </a>'});
    }
    else{
        res.render('notification', {content: '<p> Are you sure you want to log out? </p> <br> <a href="/logoutYes"> Yes </a> <br> <a href="/"> No </a>'});
    }
});

app.get("/logoutyes", function (req, res, next) {
    if(req.session.id){
        req.session.destroy(err => {
            if(err){
                return next("Something went wrong when logging out");
            }
            else{res.render('notification', {content:'<p> Logout succesful! Go back to the homepage: </p> <a href="/"> Home </a>'})}
        });
    }
    else{
        res.render('notification', {content: '<p> U are currently not logged in. Press the following link to go back: </p> <a href="/"> Home </a>'});
    }
});

app.use(function(err, req, res, next){
    if(err.message){
        res.status(500).send("Error: " + err.message);
    }
    else{res.status(500).send('Something has failed!');}
});

app.listen(8016); //can be visited at http://localhost:8016/web_pages/index.html or http://localhost:8016/css/general.css