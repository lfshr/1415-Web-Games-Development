/**
 * Created by LiamF on 16/03/2015.
 */

AsteroidGame = {};

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