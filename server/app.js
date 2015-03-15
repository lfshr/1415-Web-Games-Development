/**
 * Created by LiamF on 15/03/2015.
 */
var app = require('express')();

app.get('/', function(req, res){
    res.send("Hello World");
});

app.listen(3000);