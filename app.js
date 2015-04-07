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
    socket.playerId = -1;

    socket.on('player connect', function(player){
        var newPlayer = new AsteroidGame.Player({
                clientName: player.clientName,
                id : player.id,
                loc: player.loc,
                vel: player.vel,
                assetRef: player.assetRef
            });
        socket.playerId = player.id;
        main.addPlayer({socket : socket, player: newPlayer});
        console.log("Player "+player.clientName+" connected!");
        io.emit('player connect', player);
    });

    socket.on('post player', function(args){
        if( socket.testWoO === undefined ){
            console.log("post player args");
            console.log(args);
            socket.testWoO = true;
        }
        main.postPlayerFromClient(args);
    })

    socket.on('get player locations', function(callback){
        if( callback !== undefined ){
            if( typeof callback === "function" ){
                console.log("Sending player locations");
                console.log(main.getPlayers());
                callback(main.getPlayers());
            }
        }
    })

    socket.on('getuniqueplayerid', function(callback){
        if( typeof callback == "function" ){
            callback(main.getUniquePlayerId());
        }
    })

    socket.on('disconnect', function(reason){
        if( main.players[socket.playerId] !== undefined ){
            console.log( "Player "+main.players[socket.playerId].player.clientName+" disconnected");
            main.players[socket.playerId] = undefined;
            io.emit("player disconnect", socket.playerId, reason);
        }
    });

    updatePlayer(socket);

})

function updatePlayer(socket){
    if( socket !== undefined ){
        setTimeout(updatePlayer, 1 / AsteroidGame.framesPerSecond, socket);

        var locations = [],
            time = new Date().getTime();

        var players = main.getPlayers();
        for( var i = 0, max = players.length; i < max; i++ ){
            if( players[i] !== undefined ){
                locations.push({
                    id : players[i].id,
                    loc: players[i].loc,
                    vel: players[i].vel,
                    time_stamp: time
                });
            }
        }
        socket.emit('update player locations', locations)
    }
}


http.listen(process.env.PORT || 8080, function(){
    console.log("Listening on port "+(process.env.PORT || 8080));
});