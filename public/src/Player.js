/**
 * Created by LiamF on 17/03/2015.
 */

require(['AsteroidGame', 'Object'], function(){
    AsteroidGame = window.AsteroidGame;
    ObjClass = window.AsteroidGame.Object;
    
   
    
    AsteroidGame.Player = function(args){
        window.AsteroidGame.Object.apply(this, [args]);
        
        /*this.clientName = "John Doe";
        this._game = null;
        this._type = AsteroidGame.PLAYERTYPE;
        this.phaserAsset = null;
            
        
        if( args !== undefined ){
            this.clientName = args.clientName || clientName;
            this._game = args.game || game;
            type = args.type || type;
            
            if( args.assetRef ){
                if( game ){
                    phaserAsset = game.add.sprite(0, 0, args.assetRef);
                }
            }
        }*/
    }
    
    var test = new AsteroidGame.Player();
    
    alert(test.hasOwnProperty('clientName'))
    
    AsteroidGame.Player.prototype.getPlayerLiteral = function(){
        return{
            clientName: this.clientName,
            type: this._type;
        }
    }
});
    