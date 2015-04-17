/**
* Created by LiamF on 17/03/2015.
*/




AsteroidGame.Player = function(args){
    // Inherit Object class
    AsteroidGame.Object.apply(this, [args]);
    this.clientName = "John Doe";
    this.id = -1;
    this.fireBulletTime  = 0;
    this.bulletGroup = undefined; //{Phaser.Group}

    if( args !== undefined ){
        console.log(this.game);
        this.clientName = args.clientName || clientName;
        this.bulletGroup = args.bulletGroup || undefined;
        this.id = args.id || this.id
        if( args.assetRef ){
            this.loadSprite(args.assetRef);
        }
        
        if( this.sprite !== undefined ){
            if( this.sprite.body !== undefined ){
                this.sprite.body.drag.set(100);
            }
        }
        
        if( this.game !== undefined ){
            this.bulletGroup = this.game.add.group();
            this.bulletGroup.createMultiple(40, "bullets");
        }
    }

    this.accelerateForward = function(){
        this.game.physics.arcade.accelerationFromRotation(this.sprite.rotation, 300, this.sprite.body.acceleration);
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


