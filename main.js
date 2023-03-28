//declaring different middlewares to use
var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require("path");
var fs = require("fs");
var url = require('url');

//adding lisening
app.get("/", function(req, res){
    fs.readFile('static/web_pages/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

var staticPath = path.join(__dirname, "/static");
app.use(express.static(staticPath)); //makes you able to acces static files such as the css/img/js. NOTE: HTML/PUG IS NOT STATIC BECAUSE IT IS TAKEN FROM DATABASE

app.listen(8016);