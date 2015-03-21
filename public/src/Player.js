/**
 * Created by LiamF on 17/03/2015.
 */

require(['AsteroidGame'], function(){
    AsteroidGame = window.AsteroidGame;
    AsteroidGame.Player = function(args){
        var clientName = "John Doe",
            game = null,
            type = AsteroidGame.PLAYERTYPE;
            phaserAsset = null;
            
        this.getGame = function(){
            return game;
        }
        
        this.getType = function(){
            return type;
        }
        
        this.getPhaserAsset = function(){
            return phasetAsset;
        }
        
        if( args !== undefined ){
            clientName = args.clientName || clientName;
            game = args.game || game;
            type = args.type || type;
            
            if( args.assetRef ){
                if( game ){
                    phasetAsset = game.add.sprite(0, 0, args.assetRef);
                }
            }
        }
    }
});
    