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
        this.dirty = false;
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
        try{
            throw("Object.create called with null arguments")
        }catch(e){

        }
        return;
    }
};

AsteroidGame.Object.prototype.getAngularVelocity = function(){
    return this.sprite.body.angularVelocity;
};

AsteroidGame.Object.prototype.setAngularVelocity = function(angvel){
    this.sprite.body.angularVelocity = angvel
}

AsteroidGame.Object.prototype.getRotation = function(){
    return this.sprite.rotation;
};

AsteroidGame.Object.prototype.setRotation = function(rot){
    this.sprite.rotation = rot;
}


AsteroidGame.Object.prototype.updateLocationFromServer = function(args){
    //console.log(args);
    if( args !== undefined ){
        var timeModifier = new Date().getTime() - args.time_stamp;
        args.vel = args.vel || {x:0, y:0}
        var newloc = {
            x: args.loc.x + (args.vel.x * (timeModifier / 1000)),
            y: args.loc.y + (args.vel.y * (timeModifier / 1000))
        }

        var newrot = args.rot + (args.angvel * (timeModifier / 1000));
        if( this.sprite.x - newloc.x > 10 || this.sprite.x - newloc.x < 10 ){
            //throw("Sprite has got a dramatic different location from server")
        }
        if( this.sprite.y - newloc.y > 10 || this.sprite.y - newloc.y < 10 ){
            //throw("Sprite has got a dramatic different location from server")
        }
        this.setLocation(newloc.x, newloc.y);
        this.setVelocity(args.vel.x, args.vel.y);
        this.setAngularVelocity(args.angvel);
        this.setRotation(args.rot);
    }

    this.syncSprite();
}

AsteroidGame.Object.prototype.loadSprite = function(name){
    //if( this.group !== undefined ){
        //this.sprite = this.group.create(this.loc.x, this.loc.y, name || this.assetRef, 0, this.group);

    if( this.game !== undefined ){
        this.sprite = this.game.add.sprite(100, 100, this.assetRef, 0, this.group);
        this.sprite.scale = new Phaser.Point(this.scale, this.scale);
        this.sprite.anchor.set(0.5);
        this.game.physics.enable(this.sprite, this.game.physics.ARCADE);
        this.sprite.enableBody = true;
        this.sprite.body.maxVelocity.set(200);
        this.sprite.body.bounce = new Phaser.Point(0.5, 0.5);

        if( this.group !== undefined ){
            this.group.add(this.sprite);
        }
    }
}