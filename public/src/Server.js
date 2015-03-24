/**
 * Created by LiamF on 24/03/2015.
 */

require(['AsteroidGame'], function(){

    window.AsteroidGame.Server = function(){
        this.uri = "http://localhost:8080";
    };

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
});