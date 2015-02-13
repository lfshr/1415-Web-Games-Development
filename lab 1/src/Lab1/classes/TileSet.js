/**
 * Created by b00215095 on 13/02/2015.
 */

var TileSet = function(num_rows, num_cols, tile_size){
    this._image = null;
    this._num_rows = num_rows;
    this._num_cols = num_cols;
    this._tile_size = tile_size;
}

TileSet.prototype.loadImage = function(src, callback){
    this._image = new Image();
    this._image.src = src;
    this._image.onload = callback;
}

TileSet.prototype.setSize = function(r, c){
    this._num_rows = r;
    this._num_cols = c;
}

TileSet.prototype.drawTileSet = function(ctx){
    var destx,// the left...
        desty,// ... and the top of the current tile
        srcx,
        row,
        col;
    for( row=0; row < this._num_rows; row+=1 ){
        for( col = 0; col < this._num_cols; col+=1){
            destx = col * this._tile_size;
            desty = row * this._tile_size;
            srcx = tile_map[row][col] * this._tile_size;
            console.log("Drawing image "+row+col+".");
            this._drawImage(ctx, destx, desty, srcx);
        }
    }
}

TileSet.prototype._drawImage = function(ctx, x, y, srcx){
    srcx = srcx || 0;

    if( typeof(ctx) === "undefined" ){
        console.error("WARNING: Context undefined on TileSet.prototype.drawImage")
        return false;
    }
    // Draw image on context
    ctx.drawImage(this._image, srcx, 0, this._tile_size, this._tile_size, x, y, this._tile_size, this._tile_size )

    //Original
    //ctx.drawImage(tileSet, srcx, 0, TILE_SIZE, TILE_SIZE, destx, desty, TILE_SIZE, TILE_SIZE)
}

