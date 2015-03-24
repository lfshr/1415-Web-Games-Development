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
    //this.players = [];
    //this.state = AsteroidGame.NOSTATE;
    //this._objectBuffer = []

    this.players = [];
    this.asteroids = [];
    this.bullets = [];

    // Pass the arguments to the variables

    // Call this function to start the game.
    function start(){
        this.update();
    }

    function update(){
        setTimeout(update, 1 / AsteroidGame.framesPerSecond);

        AsteroidGame._previousTick = new Date().getTime;
        AsteroidGame.deltaTime = new Date().getTime() - AsteroidGame._previousTick;

        for( var player in players ){
            player.update();
        }
    }

    function addPlayer(player){

    }



};

AsteroidGame.Main.prototype.getUniquePlayerId = function(){
    //TODO: Make this less likely to screw up
    return this.players.length;
}