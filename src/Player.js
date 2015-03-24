/**
* Created by LiamF on 17/03/2015.
*/

AsteroidGame.Player = function(args){
    // Inherit Object class
    AsteroidGame.Object.apply(this, [args]);
    this.clientName = "John Doe";

    if( args !== undefined ){
        console.log(this);
        this.clientName = args.clientName || clientName;

        if( args.assetRef ){
            this.loadSprite(args.assetRef);
        }
    }
};

var test = new AsteroidGame.Player();

AsteroidGame.Player.prototype = AsteroidGame.Object.prototype;
