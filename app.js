/**
 * Created by LiamF on 15/03/2015.
 */
var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    views = path.join(__dirname, 'views');

    require("./src/Main.js");

var main = new AsteroidGame.Main();

app.get('/', function(req, res){
    res.sendFile(path.join(views, 'index.html'))
});

app.get('/test', function(req, res){
    res.sendFile(path.join(views, 'SpecRunner.html'));
})

app.get('/playerlocations', function(req,res){
    res.json({"0": {"clientName":"John Doe", "loc": {"x":50, "y":50}, "assetType": 'player'}});
});

app.get('/getuniqueplayerid', function( req, res){
    res.send(main.getUniquePlayerId().toString());
})

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', function(socket){

});


http.listen(process.env.PORT || 8080, function(){
    console.log("Listening on port "+process.env.PORT || 8080);
});