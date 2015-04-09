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

    this.accelerateForward = function(){
        console.log("Move up bitch");
        this.game.physics.arcade.accelerationFromRotation(this.sprite.rotation, 50, this.sprite.body.acceleration);
    }

    this.resetAcceleration = function(){
        this.sprite.body.acceleration = new Phaser.Point();
    }


    this.turnRight = function(){
        this.sprite.body.angularVelocity = 300;
    }

    this.turnLeft = function(){
        this.sprite.body.angularVelocity = -300;
    }

    this.resetAngularVelocity = function(){
        this.sprite.body.angularVelocity = 0;
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


AsteroidGame.Player.accelerateForward = function(){
    
}


