
AsteroidGame.Bullet = function(){
    this._onHitCallbacks = [];
}

AsteroidGame.Bullet.prototype = AsteroidGame.Object;

AsteroidGame.Bullet.prototype.fire = function(player){
    if( this.sprite.alive === true ){
        throw("Tried to fire an active bullet");
    } else if( player === undefined ){
        throw("Undefined sprite parsed to Bullet.fire");
    } else {
        
        this.sprite.reset(player.sprite.body.x + 16, player.sprite.body.y + 16);
        this.sprite.lifespan = 2000;
        
    }
}

AsteroidGame.Bullet.prototype.OnHit = function(callback){
    if( typeof callback !== "function" ){
        throw("OnHit was expecting callback to be typeof function, received typeof: "+typeof callback );
    } else {
        this._onHitCallbacks.push(callback);
    }
}