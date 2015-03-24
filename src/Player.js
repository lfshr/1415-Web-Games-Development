/**
* Created by LiamF on 17/03/2015.
*/

AsteroidGame.Player = function(args){
    // Inherit Object class
    AsteroidGame.Object.apply(this, [args]);
    this.clientName = "John Doe";
    this.id = -1;

    if( args !== undefined ){
        console.log(this);
        this.clientName = args.clientName || clientName;
        this.id = args.id || this.id;
        if( args.assetRef ){
            this.loadSprite(args.assetRef);
        }
    }
};

var test = new AsteroidGame.Player();

AsteroidGame.Player.prototype = AsteroidGame.Object.prototype;
