/**
 * Created by LiamF on 24/03/2015.
 */

require(['AsteroidGame', '../lib/socket.io/socket.io'], function(){

    window.AsteroidGame.Server = function(){
        this.ipAddress = "http://localhost:8080";
        this.socket = io();
        this._onPlayerConnect = [];
        this._onPlayerDisconnect = [];
        this._onPlayerDeath = [];
        this._onAsteroidCreate = [];
        this._onAsteroidDestroy = [];
    };

    window.AsteroidGame.Server.prototype.connect = function(ipAddress){
        var ipAdd = ipAddress || this.ipAddress;
        this.socket.connect(ipAdd);

        this.socket.on('player connect', function(player){
            alert("A player has connected!");
        });
    };

    window.AsteroidGame.Server.prototype.addControlledPlayerToServer = function(player){
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

    window.AsteroidGame.Server.prototype.getPlayers = function(){
        var players = [];
        $.ajax({
            url: "/playerlocations"
        })
            .done(function( data ){
                players = data;
            });

        return players;
    };

    window.AsteroidGame.Server.prototype.getUniquePlayerId = function(){
        var uniqueID = -1;
        $.ajax({
            url: "/getuniqueplayerid"
        }).done(function( data ){
            console.log("Got A Unique Player ID of:" + data)
            uniqueID = data;
        })
    }

    window.AsteroidGame.Server.prototype.onPlayerConnect = function(callback){
        if( typeof callback === "function" ){
            this._onPlayerConnect.push(callback);
        }
    }
});