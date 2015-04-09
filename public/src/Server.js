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
        console.log("Player connected: "+player.clientName)
        var onPlayerConnect = AsteroidGame.main.server._onPlayerConnect;
        if( player !== undefined ){
            if( onPlayerConnect.length === 0 ){
                throw("No handler for 'Player connect' socket event")
            }
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
        //for(var x = 0, max = players.length; x < max; x++){
            //AsteroidGame.main.addPlayer(players[x]);
        //}
    });

    this.socket.on('player disconnect', function(disconnectId, reason){
        if( AsteroidGame.main.players[disconnectId] !== undefined ){
            AsteroidGame.main.players[disconnectId].sprite.destroy();
            AsteroidGame.main.players[disconnectId] = undefined;
        }
    });
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
        loc: player.getLocation(),
        rot: player.getRotation(),
        angvel: player.getAngularVelocity(),
        vel: player.getVelocity(),
        assetRef: player.assetRef,
        id: player.id
    }
    this.socket.emit('player connect', playerServe)
}

AsteroidGame.Server.prototype.initPlayers = function(){
    var players = [];
    /*$.ajax({
        url: "/playerlocations",
        async: false
    })
        .done(function( data ){
            players = data;
        });*/

    this.socket.emit('get player locations', function(data){
        console.log("Received "+data.length+" players from server");
        for(var x = 0, max = data.length; x < max; x++){
            console.log("Adding Player to Stage");
            console.log(data[x]);
            AsteroidGame.main.addPlayer(data[x]);
        }
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
    }else{
        throw("typeof callback is "+typeof callback+". callback has to be typeof: function");
    }
}

AsteroidGame.Server.prototype.onUpdatePlayerLocations = function(callback){
    if( typeof callback === "function" ){
        this._onUpdatePlayerLocations = callback;
        console.log(this._onUpdatePlayerLocations);
    }
}

AsteroidGame.Server.prototype.postPlayerToServer = function(player){
    var args = {
        clientName: player.clientName,
        id : player.id,
        loc: player.getLocation(),
        vel: player.getVelocity(),
        rot: player.getRotation(),
        angvel: player.getAngularVelocity(),
        assetRef: player.assetRef
    }
    this.socket.emit('post player', args);
}
