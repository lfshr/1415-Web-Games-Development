/**
* Created by LiamF on 16/03/2015.
*/


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
    this.playerGroup = undefined;
    this._gamepreloadcallbacks = [];
    this.asteroidGroup = undefined;
    this.bulletGroup = undefined;
    this.preloaded = false;
    // Points to index of controlled player in players array.
    // This should be synced with the server!
    this.controlledPlayerIndex = -1;
    this.server = new AsteroidGame.Server();
    this.server.ipAddress = "localhost:3000";
    //this.server.ipAddress = document.URL;
    this.server.onPlayerConnect(function(player){
        if( player !== undefined ){
            console.log("playerid: "+player.id+"   controlledid: "+AsteroidGame.main.controlledPlayerIndex);
            if( player.id !== AsteroidGame.main.controlledPlayerIndex || player.id === -1 ){
                AsteroidGame.main.addPlayer(player);
            }
        }
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
AsteroidGame.Main.prototype.preload = function(){

    var main = AsteroidGame.main;
    main.game.load.image('player', 'assets/player.png');

    main.preloaded = true;
    console.log(main._gamepreloadcallbacks);
    if( main._gamepreloadcallbacks !== undefined ){
        for( var i = 0, max = main._gamepreloadcallbacks.length; i < max; i++ ){
            if( main._gamepreloadcallbacks[i] !== undefined ){
                if( typeof main._gamepreloadcallbacks[i].callback == "function" ){
                    main._gamepreloadcallbacks[i](main._gamepreloadcallbacks[i].args);
                }
            }
        }
    }
};

// Phaser create callback
AsteroidGame.Main.prototype.create = function(){
    // Store the game variable so we doing have to type "this.game" all the time!
    var main = AsteroidGame.main,
        g = main.game,
        players = main.players,
        asteroids = main.asteroids,
        bullets = main.bullets;

    g.renderer.clearBeforeRender = false;
    g.renderer.roundPixels = true;

    g.physics.startSystem(Phaser.Physics.ARCADE);

    this.playerGroup = g.add.group();
    asteroidGroup = g.add.group();
    bulletGroup = g.add.group();

    var uniqueID = main.server.getUniquePlayerId();

    var player = new AsteroidGame.Player({
        clientName: "The Fish",
        id: uniqueID,
        game: g,
        type: AsteroidGame.PLAYERTYPE,
        assetRef: 'player',
        assetGroup: this.playerGroup,
        loc: new AsteroidGame.Point(10, 10),
        size: new AsteroidGame.Point(5, 5)
    });

    players[uniqueID] = player;
    main.server.addControlledPlayerToServer(player);
    main.server.onUpdatePlayerLocations(function(playersFromServer){
        //console.log(playersFromServer);
        for( var i = 0, max = playersFromServer.length; i < max; i++ ){
            var playeridx = playersFromServer[i].id,
                main = AsteroidGame.main;
            if( main.players[playeridx] !== undefined ){
                main.players[playeridx].updateLocationFromServer(playersFromServer[i])
            }
        }
    })
        
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

AsteroidGame.Main.prototype.addPlayer = function(args){
    var main = AsteroidGame.main;

    if( args.id === main.controlledPlayerIndex || args.id === -1 || main.players[args.id] !== undefined )return;
    console.log("Main Game: "+main.game);
    args.game = main.game;
    args.group = main.playerGroup;
    args.type = AsteroidGame.PLAYERTYPE;
    args.size = new AsteroidGame.Point(5, 5);
    var player = new AsteroidGame.Player(args);
    this.players.push(player);
}
