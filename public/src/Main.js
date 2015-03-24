/**
 * Created by LiamF on 16/03/2015.
 */

require(['./AsteroidGame', 'Object', 'Player'], function(){

    var AsteroidGame = window.AsteroidGame;
    
    AsteroidGame.Point = function(x, y){
        this.x = x || 0;
        this.y = y || 0;
    };
    
    // The main class constructor . Commonly known as "game" in other projects
    AsteroidGame.Main = function(args){
        var game, // Phaser game class
            _width = 800, //width of the phaser canvas
            _height = 600, //height of the phaser canvas
            _hidden = false //is the canvas hidden?
        this.players = [];
        this.asteroids = [];
        this.bullets = [];
        // Phaser Groups
        this.playerGroup;
        this.asteroidGroup;
        this.bulletGroup;
        // Points to index of controlled player in players array.
        // This should be synced with the server!
        this.controlledPlayerIndex = -1;
    
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
    
    
    // Phaser preload callback
    AsteroidGame.Main.prototype.preload = function(){
        this.game.load.image('player', 'assets/player.png');
    };
    
    // Phaser create callback
    AsteroidGame.Main.prototype.create = function(){
        // Store the game variable so we doing have to type "this.game" all the time!
        var main = AsteroidGame.main,
            g = main.game,
            playerGroup = main.playerGroup,
            asteroidGroup = main.asteroidGroup,
            bulletGroup = main.bulletGroup,
            players = main.players,
            asteroids = main.asteroids,
            bullets = main.bullets;
    
        g.renderer.clearBeforeRender = false;
        g.renderer.roundPixels = true;
    
        g.physics.startSystem(Phaser.Physics.ARCADE);
    
        playerGroup = g.add.group();
        asteroidGroup = g.add.group();
        bulletGroup = g.add.group();
    
        players.push(new AsteroidGame.Player({
            clientName: "The Fish",
            game: g,
            type: AsteroidGame.PLAYERTYPE,
            assetRef: 'player',
            assetGroup: playerGroup,
            loc: new AsteroidGame.Point(10, 10),
            size: new AsteroidGame.Point(5, 5)
        }));
        
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
})
