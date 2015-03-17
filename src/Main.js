/**
 * Created by LiamF on 17/03/2015.
 */

// We don't want to add a bunch of junk to the global so we'll stick everything we need inside AsteroidGame
// To define a new class add the prefix AsteroidGame.
// For example: AsteroidGame.Player = function()
// There's only ever going to be one AsteroidGame so don't worry about it being a global, or about prototyping.

AsteroidGame = {
    // Main constants
    NOSTATE: 0,
    PAUSED: 1,
    PLAYING: 2,

    // Object Constants
    INBUFFER:0,
    ALIVE: 1,
    DEAD: 2,
    NOTYPE: 0,
    PLAYERTYPE: 1,
    ASTEROIDTYPE:2,
    BULLETTYPE:3,
    _objectBuffer: [],
    _currentObjectId: 0,
    getUniqueObjectId: function(){
        // Return a unique ID. Doesn't matter if we don't fill in blanks. Always provide a unique one.
        var ret = this._currentObjectId;
        this._currentObjectId += 1;
        return ret;
    }
};

AsteroidGame.Point = function(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

AsteroidGame.Main = function(args){
    this.players = [];
    this.state = AsteroidGame.NOSTATE;
};