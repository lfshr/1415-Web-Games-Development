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

app.get('/', function(req, res){
    res.sendFile(path.join(views, 'index.html'))
});

app.get('/test', function(req, res){
    res.sendFile(path.join(views, 'SpecRunner.html'));
})

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', function(socket){

});


http.listen(process.env.PORT || 8080, function(){
    console.log("Listening on port "+process.env.PORT || 8080);
});