/**
* Created by LiamF on 17/03/2015.
*/

// Object is going to contain all the stuff we need for server manipulation
// An object will have a position in the world as well as the ability to update to the server
// It's the prototype from this fundamental class that will update player positions and rotations.


AsteroidGame.Object = function(args){
    this.loc = {x:0, y:0};
    this.vel = {x:0, y:1};
    this.state = AsteroidGame.INBUFFER;
    this.type = AsteroidGame.NOTYPE;
    this.game = undefined; //Phaser.Game
    this.group = undefined; //Phaser.Group
    this.sprite = undefined; //Phaser.Sprite

    if( args !== undefined ){
        this.loc = args.loc || this.loc;
        this.state = args.state || this.state;
        this.type = args.type || this.type;
        this.game = args.game
        this.group = args.assetGroup;
    }
};

AsteroidGame.Object.prototype.getLocation = function(){
    return this.loc;
};

AsteroidGame.Object.prototype.setLocation = function(x, y){
    this.loc.x = x || this.loc.x;
    this.loc.y = y || this.loc.y;
};

AsteroidGame.Object.prototype.move = function(x, y){
    this.loc.x = x || this.loc.x;
    this.loc.y = y || this.loc.y;
};

AsteroidGame.Object.prototype.update = function(){
    this.pos.x += this.vel.x * AsteroidGame.deltaTime;
    this.pos.y += this.vel.y * AsteroidGame.deltaTime;
};

AsteroidGame.Object.prototype.syncSprite = function(){
    this.sprite.x = this.loc.x;
    this.sprite.y = this.loc.y;
}

AsteroidGame.Object.prototype.create = function(args){
    if( args === null ){
        console.error("Object.create called with null arguments")
        return;
    }
};

AsteroidGame.Object.prototype.loadSprite = function(name){

    this.sprite = this.game.add.sprite(this.loc.x, this.loc.y, name, 0, this.group);
    console.log(this.group)
}

