/**
 * Created by LiamF on 17/03/2015.
 */

// Object is going to contain all the stuff we need for server manipulation
// An object will have a position in the world as well as the ability to update to the server
// It's the prototype from this fundamental class that will update player positions and rotations.

AsteroidGame.Object = function(args){
    this.loc = {x:0, y:0};
    this.state = AsteroidGame.INBUFFER;
    this.type = AsteroidGame.NOTYPE;

    if( args !== undefined ){
        this.loc = args.loc || this.loc;
    }
}

AsteroidGame.Object.prototype.getLocation = function(){
    return this.loc;
}

AsteroidGame.Object.prototype.setLocation = function(x, y){
    this.loc.x = x || this.loc.x;
    this.loc.y = y || this.loc.y;
}

AsteroidGame.Object.prototype.move = function(args){
    if( args !== undefined ){
        this.loc.x = this.loc.x + args.x || this.loc.x;
        this.loc.y = this.loc.y + args.y || this.loc.y;
    }
}