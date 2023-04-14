//declaring different middlewares to use
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require("path");
const fs = require("fs");
const url = require('url');
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require('bcrypt');

//setup for the server beforehand
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.urlencoded({extended: false}));
const staticPath = path.join(__dirname, "/static");
app.use(express.static(staticPath)); 
//makes you able to acces static files such as the css/img/js. NOTE: HTML/PUG isn't static because we pull data from DB.
//However tag-only HTML is considered static, since the tags themselves are consistent.

//var db = new sqlite3.Database("cinema");

//NOTE TO SELF: IN ORDER TO MAKE CLICK IMG --> USE app.get("/moviedesc/:movid", function(req, res){}). THEN REDIRECT TO THIS PAGE WITH CORRECT ID BASED ON ID IN DB! 
//IN THIS CASE READFILE GENERAL PAGE SETUP + INSERT DATA BASED ON QUERY IN URL.

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
        db.all("SELECT * FROM movie", (err, rows) => {
            res.json(rows);
        });
    })
    db.close();
});
app.get("/profile", function (req, res) {
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
app.get("/static/web_pages/moviefastandfurious1.html", function (req, res) {
    fs.readFile('static/web_pages/moviefastandfurious1.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
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
    let username= req.body.user;
    let password= req.body.password;

    res.end();
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
        
    } catch{
        res.redirect('/register');
    }

    res.end();
    db.close();
});

app.use(function(err, req, res, next){
    if(err.message){
        res.status(500).send("Error: " + err.message);
    }
    res.status(500).send('Something has failed!')
})
app.listen(8016); //can be visited at http://localhost:8016/web_pages/index.html or http://localhost:8016/css/general.css

//event listener for if the server shuts down?
/*process.on('SIGINT', () => {
    db.close();
    server.close();
});*/