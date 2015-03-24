/**
* Created by LiamF on 24/03/2015.
*/

AsteroidGame.Server = function(){
    this.ipAddress = "http://localhost:8080";
    this.socket = io();
    this._onPlayerConnect = [];
    this._onUpdatePlayerLocations = undefined;
    this._onPlayerDisconnect = [];
    this._onPlayerDeath = [];
    this._onAsteroidCreate = [];
    this._onAsteroidDestroy = [];
};

AsteroidGame.Server.prototype.connect = function(ipAddress){
    var ipAdd = ipAddress || this.ipAddress;
    this.socket.connect(ipAdd);

    this.socket.on('player connect', function(player){
        var onPlayerConnect = AsteroidGame.main.server._onPlayerConnect;
        if( player !== undefined ){
            for( var i = 0; i < onPlayerConnect.length; i++ ){
                onPlayerConnect[i](player);
            }
        }
    });

    console.log( typeof _onUpdatePlayerLocations );
    this.socket.on('update player locations', function(players){
        var onUpdatePlayerLocations = AsteroidGame.main.server._onUpdatePlayerLocations;
        if( players !== undefined && typeof onUpdatePlayerLocations === "function" ){
            onUpdatePlayerLocations(players);
        }
    });

    this.socket.on('init players', function(players){
        for(var x = 0, max = players.length; x < max; x++){
            AsteroidGame.main.addPlayer(players[x]);
        }
    })
};

AsteroidGame.Server._update_player_locations_ = function(locations){
    this._onUpdatePlayerLocations(locations);
}

AsteroidGame.Server.prototype.addControlledPlayerToServer = function(player){
    if( player.id == -1 ){
        player.id = this.getUniquePlayerId();
    }
    console.log(player);
    var playerServe = {
        clientName: player.clientName,
        loc: player.loc,
        vel: player.vel,
        assetRef: player.assetRef,
        id: player.id
    }
    this.socket.emit('player connect', playerServe, function(){

    });
}

AsteroidGame.Server.prototype.getPlayers = function(){
    var players = [];
    $.ajax({
        url: "/playerlocations",
        async: false
    })
        .done(function( data ){
            players = data;
        });

    return players;
};

AsteroidGame.Server.prototype.getUniquePlayerId = function(){
    var uniqueID = -1;
    $.ajax({
        url: "/getuniqueplayerid",
        async: false
    }).done(function(data){
        console.log("Got a unique ID of "+data+" changing from "+uniqueID);
        uniqueID = data;
    })
    return uniqueID;
}

AsteroidGame.Server.prototype.onPlayerConnect = function(callback){
    if( typeof callback === "function" ){
        this._onPlayerConnect.push(callback);
    }
}

AsteroidGame.Server.prototype.onUpdatePlayerLocations = function(callback){
    if( typeof callback === "function" ){
        this._onUpdatePlayerLocations = callback;
        console.log(this._onUpdatePlayerLocations);
    }
}
