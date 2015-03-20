/**
 * Created by LiamF on 17/03/2015.
 */

AsteroidGame.Player = function(sprite, args){
    this.sprite = sprite;
    this.displayName = "Unknown";
    this.loc = new Point();
    this.type = AsteroidGame.PLAYERTYPE;

    if( args !== undefined ){
        this.displayName = args.displayName || "Unknown";
    }
};

AsteroidGame.Player.prototype = AsteroidGame.Object.prototype;