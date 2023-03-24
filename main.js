//declaring different middlewares to use
var app = require('express')();
var morgan = require('morgan');

//adding lisening
app.get("/", function(req, res){
    res.writeHead(200);
    res.end("Test Test server");
});
app.listen(8016);