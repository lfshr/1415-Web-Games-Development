/**
 * Created by LiamF on 17/03/2015.
 */

// We don't want to add a bunch of junk to the global so we'll stick everything we need inside AsteroidGame
// To define a new class add the prefix AsteroidGame.
// For example: AsteroidGame.Player = function()
// There's only ever going to be one AsteroidGame so don't worry about it being a global, or about prototyping.

require("./AsteroidGame.js");
require("./Object.js");
require("./Player.js");

AsteroidGame.Point = function(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

AsteroidGame.Main = function(){
    //this.clients = [];
    //this.state = AsteroidGame.NOSTATE;
    //this._objectBuffer = []

    this.players = [];
    this.asteroids = [];
    this.bullets = [];

    // Pass the arguments to the variables

    // Call this function to start the game.



};

AsteroidGame.Main.prototype.start = function(){
    this.update();
}

AsteroidGame.Main.prototype.update = function(){
    setTimeout(AsteroidGame.main.update, 1 / AsteroidGame.framesPerSecond * 1000);
    AsteroidGame.deltaTime = (new Date().getTime() - AsteroidGame._previousTick) / 1000;
    AsteroidGame._previousTick = new Date().getTime();


    for(var i = 0, max = AsteroidGame.main.players.length; i < max; i++){
        AsteroidGame.main.players[i].player.update();
    }
}

AsteroidGame.Main.prototype.getUniquePlayerId = function(){
    //TODO: Make this less likely to screw up
    return this.players.length;
};

AsteroidGame.Main.prototype.addPlayer = function(client){
    this.players.push(client);
};

AsteroidGame.Main.prototype.getPlayers = function(){
    var players = [];
    for( var x = 0, max = this.players.length; x < max; x++ ){
        players.push( this.players[x].player )
    }
    return players;
};

AsteroidGame.Main.prototype.getClients = function(){
    return this.players;
}