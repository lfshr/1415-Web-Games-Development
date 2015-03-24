/**
 * Created by LiamF on 16/03/2015.
 */

require(['./AsteroidGame', 'Object', 'Player', 'Server'], function(){
    
    window.AsteroidGame.Point = function(x, y){
        this.x = x || 0;
        this.y = y || 0;
    };
    
    // The main class constructor . Commonly known as "game" in other projects
    window.AsteroidGame.Main = function(args){
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
        this.server = new window.AsteroidGame.Server();
        this.server.uri = "http://localhost:8080";
        this.server.onPlayerConnect(function(){

        });

        this.server.connect();
    
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
    window.AsteroidGame.Main.prototype.preload = function(){
        this.game.load.image('player', 'assets/player.png');
    };
    
    // Phaser create callback
    window.AsteroidGame.Main.prototype.create = function(){
        // Store the game variable so we doing have to type "this.game" all the time!
        var main = window.AsteroidGame.main,
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

        var uniqueID = main.server.getUniquePlayerId();

        var player = new window.AsteroidGame.Player({
            clientName: "The Fish",
            id: uniqueID,
            game: g,
            type: window.AsteroidGame.PLAYERTYPE,
            assetRef: 'player',
            assetGroup: playerGroup,
            loc: new window.AsteroidGame.Point(10, 10),
            size: new window.AsteroidGame.Point(5, 5)
        });

        players[uniqueID] = player;
        main.server.addControlledPlayerToServer(player);
        main.server.onUpdatePlayerLocations(function(playersFromServer){
            //console.log(playersFromServer);
            for( var i = 0, max = playersFromServer.length; i < max; i++ ){
                var playeridx = playersFromServer[i].id,
                    main = window.AsteroidGame.main;
                if( main.players[playeridx] !== undefined ){
                    main.players[playeridx].updateLocationFromServer(playersFromServer[i])
                }
            }
        })
        
    };

    window.AsteroidGame.Main.prototype.update = function(){
        // use setTimeout in server as we don't want this running every time it can
        window.AsteroidGame._previousTick = new Date().getTime();

    };

    window.AsteroidGame.Main.prototype.start = function(){
        // Define the phaser game
        this.game = new Phaser.Game(this._width, this._height, this._hidden ? Phaser.HEADLESS : Phaser.AUTO, '', {preload: this.preload, create: this.create, update: this.update})
        window.AsteroidGame._previousTick = new Date().getTime;
    };

    window.AsteroidGame.Main.prototype.addObjectToBuffer = function(object){
        if( this.hasObjectInBuffer(object) === false ){
            var uniqueId = window.AsteroidGame.getUniqueObjectId();
            this._objectBuffer[uniqueId] = object;
        }
    };

    window.AsteroidGame.Main.prototype.hasObjectInBuffer = function(object){
        return this._objectBuffer.indexOf(object) !== -1;
    };
})
