/**
 * Created by LiamF on 17/03/2015.
 */

require(['AsteroidGame', 'Object'], function(){
    var AsteroidGame = window.AsteroidGame;

    AsteroidGame.Player = function(args){
        // Inherit Object class
        AsteroidGame.Object.apply(this, [args]);
        this.clientName = "John Doe";
        this.id = -1;
        
        if( args !== undefined ){
            console.log(this);
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

    AsteroidGame.Player.prototype.updateLocationFromServer = function(args){
        console.log(args);
        if( args !== undefined ){
            this.loc.x = args.loc.x || this.loc.x;
            this.loc.y = args.loc.y || this.loc.y;
        }

        this.syncSprite();
    }

    AsteroidGame.Player.prototype.setId = function(newid){
        this.id = newid;
    }
});
    