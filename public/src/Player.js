/**
* Created by LiamF on 17/03/2015.
*/




AsteroidGame.Player = function(args){
    // Inherit Object class
    AsteroidGame.Object.apply(this, [args]);
    this.clientName = "John Doe";
    this.id = -1;

    if( args !== undefined ){
        console.log(this.game);
        this.clientName = args.clientName || clientName;
        this.id = args.id || this.id

        if( args.assetRef ){
            this.loadSprite(args.assetRef);
        }
    }
};

var test = new AsteroidGame.Player();

AsteroidGame.Player.prototype = AsteroidGame.Object.prototype;

AsteroidGame.Player.prototype.getPlayerLiteral = function(){
    return{
        clientName: this.clientName,
        type: this._type
    }
};

AsteroidGame.Player.prototype.setId = function(newid){
    this.id = newid;
}


AsteroidGame.Player.prototype.accelerateForward = function(){
    console.log("Move up bitch");
    this.game.physics.arcade.accelerationFromRotation(this.sprite.rotation, 50, this.sprite.body.acceleration);
}

AsteroidGame.Player.prototype.resetAcceleration = function(){
    this.sprite.body.acceleration = new Phaser.Point();
}

AsteroidGame.Player.prototype.turnRight = function(){
    this.sprite.body.angularVelocity = 300;
}

AsteroidGame.Player.prototype.turnLeft = function(){
    this.sprite.body.angularVelocity = -300;
}

AsteroidGame.Player.prototype.resetAngularVelocity = function(){
    this.sprite.body.angularVelocity = 0;
}