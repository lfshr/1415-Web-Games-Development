/**
 * Created by LiamF on 15/03/2015.
 */
var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    hostIp = null;

io.on('connection', function(socket){

    socket.on('handshake', function (args) {
        console.log(args);
        var clientName = args.clientName !== 'undefined' ? args.clientName : '',
            endMessage = ' connected on: ' + socket.handshake.address;
        console.log('User ' + clientName + endMessage)
    });

    socket.on('test', function(msg, callback){
        console.log('hello received');
        if(msg === 'hello'){
            console.log('world responded');
            callback('world');
        }
    });

    socket.on('am i host', function (callback) {
        console.log('User: ')
        if (hostIp == false) {
            hostIp = socket.handshake.address;
        }
    });
});

http.listen(3000, function(){
    console.log("Listening on port 3000");
});