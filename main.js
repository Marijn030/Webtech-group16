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
    const {userId} = req.session;//pulls the session from the request into a local object with the (possible) userId
    if(!userId) {console.log("currently not logged in")}
    fs.readFile('static/web_pages/index.html', function(err, data) {//gives the user the home page
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});
//handles the request to see the movies in our database is used by index.js to receive the info
app.get("/movies", (req, res) => {
    var db = new sqlite3.Database("cinema");//opens the database for use
    db.serialize(function () {
        db.all("SELECT title AS title, movie.id AS id FROM moviescreening, movie WHERE movie.id = moviescreening.movie_id AND strftime('%s', 'now') < strftime('%s', datetime)", (err, rows) => {
            res.json(rows);
        });
    });
    db.close();
});

//??
app.get("/moviescreenings", (req, res) => {
    var db = new sqlite3.Database("cinema");//opens the database for use
    db.serialize(function () {
        db.all("SELECT moviescreening.id, moviescreening.movie_id, moviescreening.datetime FROM moviescreening WHERE strftime('%s', 'now') < strftime('%s', moviescreening.datetime)", (err, rows) => {
            res.json(rows);
        });
    });
    db.close();
});

//user wants to see their profile page
app.get("/profile",  async function (req, res) {
    if(!req.session.userId){
        res.render('notification', {content : '<p> U are currently not logged in. Press the following link to log in: </p> <a href="/login"> Log in </a>'});
    }
    else{
        function getUserById(userId){//inputs the id (in the database) from the user and outputs a JSON object of that user
            const db = new sqlite3.Database("cinema");//opens the database for use
            return new Promise((resolve, reject) => {
                db.serialize(function () {//finds the user in the database
                    db.get("SELECT * FROM user WHERE user.id = ?", [userId], (err, rows) => {
                        if(err){ return reject(err);}
                        return resolve(rows); //returns JSON object
                    });
                });
                db.close();
            });
        }
        function getOrderHistory(userId){//inputs a user's id and outputs their order history as a json object (incl. data: title and screening moment)
            const db = new sqlite3.Database("cinema");//opens the database for use
            return new Promise((resolve, reject) => {
                db.serialize(function () {//finds the order history of the user
                    db.all("SELECT title, datetime FROM orderhistory, moviescreening, movie WHERE orderhistory.user_id = ? AND moviescreening.id = orderhistory.moviescreening_id AND moviescreening.movie_id = movie.id", [userId], (err, rows) => {
                        if(err){ return reject(err);}
                        return resolve(rows); //returns JSON object
                    });
                })
                db.close();
            });
        }
        var user = await getUserById(req.session.userId);//saves the user object locally to be sent out to the page
        var orderHistory = await getOrderHistory(req.session.userId);// saves the orderhistory object locally to be sent out to the page
        var oHistory = ""; //an empty string to input the information of the user's order history
        for(let ticket of orderHistory){// ticket is each order the user has placed
            oHistory += "title: " + ticket.title + ", time of airing: " + ticket.datetime + ". <br> "; 
        }
        res.render('userprofile', {name : user.name, email : user.email, login : user.login, password : user.password, address : user.address, creditcard : user.creditcard, history : oHistory});    
    }
});

//retrieves the store page and sends it to the user, unless the user is not logged in
app.get("/store", function (req, res) {
    if(!req.session.userId){
        res.render('notification', {content : '<p> U are currently not logged in. Press the following link to log in: </p> <a href="/login"> Log in </a>'});
    }
    else{
        fs.readFile('static/web_pages/store.html', function (err, data) {//write the store page to the response to user
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
});

//renders each page with the information of the specific movie the user requested to see
app.get("/clickedmovie/:movId", function (req, res, next) {
        if(!parseInt(req.params.movId, 10)){return(next(new Error("Invalid url.")));}
        var movId = parseInt(req.params.movId, 10);//the id of the movie the user wants to investigate
        const db = new sqlite3.Database("cinema");//opens the database for use
        var title, genre, year, director, writer, actor, post, trail, pl;//these save all the information about the movie from the database
        db.serialize(function() {
            db.get("SELECT * FROM movie WHERE rowid = ?", [movId], (err, rows) => {//inputs the one/zero result(s) for the movie requested into the page that displays the information
                if(err){next(new Error("Fetching from database failed."));}
                else if(!rows){next(new Error("Movie wasn't found in database."));}
                else{title = rows.title; genre = rows.genre; year = rows.year; director = rows.director; writer = rows.writer; actor = rows.actor; post = rows.poster; trail = rows.trailer; pl = rows.plot;
                    res.render('movieinfo', {movietitle:title, moviegenre:genre, movieyear:year, moviedirector:director, moviewriter:writer,
                    actors: actor, poster:post, trailer:trail, plot:pl});}
            });
        });
        db.close();
});
//user requests the login page, and is shown a different page if already logged in
app.get("/login", function (req, res) {
    if(req.session.userId){
        return res.render('notification', {content : '<p> U are already logged in. Press the following link to go back: </p> <a href="/"> Home </a>'});
    }
    else{
        fs.readFile('static/web_pages/login.html', function (err, data) {//send login page to anonymous user
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
});
//user makes request to log in, we check if they have the correct password and login,
//on succes -> notify and offer link to home page, failure -> notify and offer link to retry
app.post("/login", async function(req, res){
    const password = req.body.password;
    const login = req.body.userlogin;
    function getUserByLogin(login){//takes the login of the user and returns that user as json object
        const db = new sqlite3.Database("cinema");//opens the database for use
        return new Promise((resolve, reject) => {
            db.serialize(function () {
                db.get("SELECT * FROM user WHERE user.login = ?", [login], (err, rows) => {//try to find user by given login
                    if(err){ return reject(err);}
                    return resolve(rows); //returns JSON object
                });
            })
            db.close();
        });
    }
    var user = await getUserByLogin(login);//saves the user locally
    if(!user || user.password !== password){
        return res.render('notification', {content: '<p> Incorrect password or username. </p> <a href="/login"> Retry </a>'});
    }
    else{
        req.session.userId = user.id;//user id is saved into the session
        return res.render('notification', {content: '<p> Login succeeded. </p> <a href="/"> Go back to homepage </a>'});
    }
});
//user wants to see the register page, and receives that only if not already logged in, otherwise user is notified of logged in status
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
//user attempts to register with us and is registered and logged in on success, otherwise notified of failure 
app.post("/register", async (req, res) => {
    const name = req.body.name; //the client's name
    const email = req.body.email; // the input email
    const login = req.body.userlogin; // the given login
    const pw = req.body.password; //the given password
    const address = req.body.address; //the input address
    const ccard = req.body.credit_card; //the client's credit card number
    if(!name || !email || !login || !pw || !address || !ccard){
        res.render('notification', {content: '<p> Something appears to be missing. </p> <a href="/register"> Retry </a>'});
    }
    else{
        function insertUser(n, e, l, p, a, c){ //attempts to insert the user into the database, and returns their attributed id on success
            const db = new sqlite3.Database("cinema");//opens the database for use
            return new Promise((resolve, reject) => {
                db.serialize(function () {//inserts the information into the database
                    db.run("INSERT INTO user (name, email, login, password, address, creditcard) VALUES (?, ?, ?, ?, ?, ?)", [n, e, l, p, a, c], function(err){
                        if(err){return reject(err);}
                        else{return resolve(this.lastID);}
                    });
                })
                db.close();
            });
        }
        function getUserById(userId){//gets the user as json object based on the received id
            const db = new sqlite3.Database("cinema");//opens the database for use
            return new Promise((resolve, reject) => {
                db.serialize(function () {//attempts to find the user in the database
                    db.get("SELECT * FROM user WHERE user.id = ?", [userId], (err, rows) => {
                        if(err){ return reject(err);}
                        return resolve(rows); //returns JSON object
                    });
                })
                db.close();
            })
        }
        var user = await insertUser(name, email, login, pw, address, ccard).then(insertId => {return getUserById(insertId)}); //saves user locally, if the user is successfully inserted into database
        req.session.userId = user.id;//the user's id is saved into the session
        return res.render('notification', {content: '<p> Account has been registered and u have been logged in. </p> <a href="/"> Go back to homepage </a>'});
    }
});
app.post("/buyticket", async (req, res) => {

});
//user suggested they might want to log out, and are asked to confirm that in the page sent to them in the response, if they are logged in
app.get("/logout", function (req, res) {
    if(!req.session.userId){
        //user is notified they are not logged in
        res.render('notification', {content: '<p> U are currently not logged in. Press the following link to go back: </p> <a href="/"> Home </a>'});
    }
    else{
        res.render('notification', {content: '<p> Are you sure you want to log out? </p> <br> <a href="/logoutYes"> Yes </a> <br> <a href="/"> No </a>'});
    }
});
//the user confirms that they want to log out of their account and is notified of their logout if the session is successfully destroyed
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
//the error middleware that sends the given error message back to the user. Called upon if next is called with an error parameter
app.use(function(err, req, res, next){
    if(err.message){
        res.status(500).send("Error: " + err.message);
    }
    else{res.status(500).send('Something has failed!');}
});

app.listen(8016); //the app listens to port 8016