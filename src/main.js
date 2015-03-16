/**
 * Created by LiamF on 15/03/2015.
 */

/*
 * main is the class that starts as the window loads and hooks up Phaser
 */

var WebAsteroids = {};

// There should only be one of these classes at one time so prototyping doesn't really matter
WebAsteroids.Main = function () {
    game = null,
        server = new Server();

    function start() {
        game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preset: preset, create: create, update: update});
    }

    function preset() {

    }

    function create() {

    }

    function update() {
        if (Server.connected) {
            //TODO: add logic to update via server
        } else {
            //TODO: Do everything yourself
        }
    }

    function connectToServer(ip) {
        return server.connect(ip);
    }
}
