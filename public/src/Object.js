/**
* Created by LiamF on 17/03/2015.
*/

// Object is going to contain all the stuff we need for server manipulation
// An object will have a position in the world as well as the ability to update to the server
// It's the prototype from this fundamental class that will update player positions and rotations.

AsteroidGame.Object = function(args){
    this.scale = 0.5;
    this.state = AsteroidGame.INBUFFER;
    this.type = AsteroidGame.NOTYPE;
    this.game = undefined; //Phaser.Game
    this.group = undefined; //Phaser.Group
    this.sprite = undefined; //Phaser.Sprite
    this.assetRef = "unknown";
    this.dirty = true;

    if( args !== undefined ){
        this.state = args.state || this.state;
        this.type = args.type || this.type;
        this.game = args.game
        this.group = args.assetGroup;
        this.assetRef = args.assetRef;
    }
};

AsteroidGame.Object.prototype.getLocation = function(){
    return {x: this.sprite.x, y:this.sprite.y};
};

AsteroidGame.Object.prototype.setLocation = function(x, y){
    this.sprite.x = x;
    this.sprite.y = y;
};

AsteroidGame.Object.prototype.move = function(x, y){
    this.sprite.x += x;
    this.sprite.y += y;
};

AsteroidGame.Object.prototype.update = function(){
    if( this.dirty === true ){
        AsteroidGame.main.server.postPlayerToServer(this);
    }

    if( this.sprite === undefined ){
        console.error("No Sprite in player");
        console.log(self);
        AsteroidGame.state = AsteroidGame.PAUSED;
    }
};

AsteroidGame.Object.prototype.syncSprite = function(){
    /*this.sprite.x = this.loc.x;
    this.sprite.y = this.loc.y;*/
}

AsteroidGame.Object.prototype.setVelocity = function(xx, yy){
    this.sprite.body.velocity = new Phaser.Point(xx,yy);
};

AsteroidGame.Object.prototype.getVelocity = function(){
    return{ x: this.sprite.body.velocity.x, y: this.sprite.body.velocity.y };
}

AsteroidGame.Object.prototype.create = function(args){
    if( args === null ){
        console.error("Object.create called with null arguments")
        return;
    }
};

AsteroidGame.Object.prototype.updateLocationFromServer = function(args){
    //console.log(args);
    if( args !== undefined ){
        var timeModifier = 1 / (new Date().getTime() - args.time_stamp);
        var newloc = {
            x: args.loc.x + (args.vel.x * timeModifier),
            y: args.loc.y + (args.vel.y * timeModifier)
        }
        this.setLocation(newloc.x, newloc.y);
        this.setVelocity(args.vel.x, args.vel.y);
    }

    this.syncSprite();
}

AsteroidGame.Object.prototype.loadSprite = function(name){
    //if( this.group !== undefined ){
        //this.sprite = this.group.create(this.loc.x, this.loc.y, name || this.assetRef, 0, this.group);
    if( this.game !== undefined ){
        this.sprite = this.game.add.sprite(0, 0, this.assetRef, 0, this.group);
        this.sprite.scale = new Phaser.Point(this.scale, this.scale);
        this.game.physics.enable(this.sprite, this.game.physics.ARCADE);
    }
}
