/**
 * Created by LiamF on 16/03/2015.
 */

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

// There should only be one Main class in use so forget prototyping
AsteroidGame.Main = function(args){
    var game,
        _width = 800, //width of the phaser canvas
        _height = 600, //height of the phaser canvas
        _hidden = false; //is the canvas hidden?

    // Pass the arguments to the variables
    if( args !== undefined ){
        _width = args.width || width;
        _height = args.height || height;
        _hidden = args.hidden || hidden;
    }

    // Call this function to start the game.
    function start(){
        game = new Phaser.Game(_width, _height, _hidden ? Phaser.HEADLESS : Phaser.AUTO, '', {preset: preset, create: create, update: update})
    }

    function preset(){

    }

    function create(){

    }

    function update(){

    }

    this.getWidth = function(){
        return _width;
    }
    this.getHeight = function(){
        return _height;
    }
    this.isHidden = function(){
        return _hidden;
    }
}