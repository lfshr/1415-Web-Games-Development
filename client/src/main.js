/**
 * Created by LiamF on 15/03/2015.
 */

/*
 * main is the class that starts as the window loads and hooks up Phaser
 */

var _gameIsInitialised = false,
    game = null,
    _testCallback; // Hooks to Phaser.Game class

$(document).ready(function () {
    initializeGame();
});

function initializeGame() {
    console.log(_testCallback);
    _gameIsInitialised = true;
    if (_testCallback) {
        console.log('callback ' + _testCallback);
        _testCallback();
    }
}

function setTestCallback(callback) {
    console.log("Setting Callback to " + callback)
    _testCallback = callback;
}