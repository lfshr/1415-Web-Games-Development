/**
 * Created by b00215095 on 13/02/2015.
 */

var canvas, // The HTML5 Canvas
    context,// The 2d Graphics context
    tileSet, //contains tileSet
    TILE_SIZE = 16, // Size of a tile in pixels
    NUM_ROWS = 30, //count of rows
    NUM_COLS = 40; // and columns

//This is the function that draws tiles on the display.
//Context is passed as parameter & canvas is expected to be 640px x 480px

function loadTiles(src) {
    tileSet = new TileSet(NUM_ROWS, NUM_COLS, TILE_SIZE)
    tileSet.loadImage("images/tileset.png", function(){
        tileSet.drawTileSet(context);
    })
}
window.onload = function(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d")
    loadTiles("images/tileset.png");
}