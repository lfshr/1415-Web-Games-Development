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

AsteroidGame.Point = function(x, y){
    this.x = x || 0;
    this.y = y || 0;
};

AsteroidGame.Main = function(args){
    var game,
        _width = 800, //width of the phaser canvas
        _height = 600, //height of the phaser canvas
        _hidden = false, //is the canvas hidden?
        players, // Phaser group for players
        asteroids, // Phaser group for asteroids
        bullets; // Phaser group for bullets

    // Pass the arguments to the variables
    if( args !== undefined ){
        _width = args.width || _width;
        _height = args.height || _height;
        _hidden = args.hidden || _hidden;
    }

    // Call this function to start the game.
    function start(){
    }

    this.getWidth = function(){
        return _width;
    };
    this.getHeight = function(){
        return _height;
    };
    this.isHidden = function(){
        return _hidden;
    }
};

AsteroidGame.Main.prototype.preload = function(){
    this.game.load.image('player', 'assets/player.png');
};

AsteroidGame.Main.prototype.create = function(){

    var game = this.game,
        players = this.players,
        asteroids = this.asteroids,
        bullets = this.bullets;

    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    players = game.add.group();
    asteroids = game.add.group();
    bullets = game.add.group();

    var player = new Object({
        game: this.game,
        type: AsteroidGame.PLAYERTYPE
    });
};

AsteroidGame.Main.prototype.update = function(){
    // use setTimeout in server as we don't want this running every time it can
    AsteroidGame._previousTick = new Date().getTime();
};

AsteroidGame.Main.prototype.start = function(){
    // Define the phaser game
    this.game = new Phaser.Game(this._width, this._height, this._hidden ? Phaser.HEADLESS : Phaser.AUTO, '', {preload: this.preload, create: this.create, update: this.update})
    AsteroidGame._previousTick = new Date().getTime;
};

AsteroidGame.Main.prototype.addObjectToBuffer = function(object){
    if( this.hasObjectInBuffer(object) === false ){
        var uniqueId = AsteroidGame.getUniqueObjectId();
        this._objectBuffer[uniqueId] = object;
    }
};

AsteroidGame.Main.prototype.hasObjectInBuffer = function(object){
    return this._objectBuffer.indexOf(object) !== -1;
};

