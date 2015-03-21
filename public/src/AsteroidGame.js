
define( function(){
    require(['../lib/phaser/phaser']);
    window.AsteroidGame = {
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
});