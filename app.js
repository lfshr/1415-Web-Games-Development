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

AsteroidGame.main = new AsteroidGame.Main();
var main = AsteroidGame.main;
main.start();

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
    console.log("connection made");
    socket.on('player connect', function(player){
        var newPlayer = new AsteroidGame.Player({
                clientName: player.clientName,
                id : player.id,
                loc: player.loc,
                vel: player.vel,
                assetRef: player.assetRef
            });

        main.addPlayer({socket : socket, player: newPlayer});
        console.log("Player "+player.clientName+" connected!");
    });

    socket.on('getuniqueplayerid', function(callback){
        if( typeof callback == "function" ){
            callback(main.getUniquePlayerId());
        }
    })

    updatePlayer(socket);

})

function updatePlayer(socket){
    if( socket !== undefined ){
        setTimeout(updatePlayer, 1 / AsteroidGame.framesPerSecond, socket);

        var locations = [];

        var players = main.getPlayers();
        for( var i = 0, max = players.length; i < max; i++ ){
            var player = players[i].player;
            locations.push({
                id : player.id,
                loc: player.loc,
                vel: player.vel
            });
        }
        socket.emit('update player locations', locations)
    }
}


http.listen(process.env.PORT || 8080, function(){
    console.log("Listening on port "+process.env.PORT || 8080);
});