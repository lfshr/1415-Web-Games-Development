/**
 * Created by LiamF on 17/03/2015.
 */

// We don't want to add a bunch of junk to the global so we'll stick everything we need inside AsteroidGame
// To define a new class add the prefix AsteroidGame.
// For example: AsteroidGame.Player = function()
// There's only ever going to be one AsteroidGame so don't worry about it being a global, or about prototyping.

AsteroidGame = {
    _previousTick: 0,
    deltaTime: function(){
        return new Date().getTime() - this._previousTick;
    },
    framesPerSecond: 30,
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
    this._objectBuffer = []
};


AsteroidGame.Main.prototype.start = function(){
    AsteroidGame._previousTick = new Date().getTime;
    this.update();
}

AsteroidGame.Main.prototype.addObjectToBuffer = function(object){
    if( this.hasObjectInBuffer(object) === false ){
        var uniqueId = AsteroidGame.getUniqueObjectId();
        this._objectBuffer[uniqueId] = object;
    }
}

AsteroidGame.Main.prototype.hasObjectInBuffer = function(object){
    return this._objectBuffer.indexOf(object) !== -1;
}

AsteroidGame.Main.prototype.update = function(){
    // use setTimeout in server as we don't want this running every time it can
    setTimeout(this.update(), 1 / AsteroidGame.framesPerSecond);
    for( var object in this._objectBuffer)
    AsteroidGame._previousTick = new Date().getTime();
}