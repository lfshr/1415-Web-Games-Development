/**
 * Created by LiamF on 15/03/2015.
 */
var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    connectedSockets = [],
    connectedUsers = [],
    hostSocketId = -1;

io.on('connection', function(socket){

    connectedSockets[socket.id] = socket;

    socket.on("do client handshake", function(args){
        var clientName = "John Doe",
            clientIsHost = false;


        if( hostSocketId === -1 ){
            hostSocketId = socket.id;
            clientIsHost = true;
        }

        // Add the user to connectedUsers
        connectedUsers[socket.id] = {
            clientName: clientName,
            clientIsHost: clientIsHost
        }
        console.log(connectedUsers);
        socket.emit("return handshake", {
            isHost: clientIsHost,
            connectedUsers: connectedUsers
        });
    });

    /*socket.on('connection handshake', function (args) {
        console.log(args);
        var clientName = '',
            endMessage = ' connected on: ' + socket.handshake.address;

        // Make sure args is defined and clientName is defined in it before trying to access
        if( args !== undefined ){
            args.clientName !== undefined ? args.clientName : '';
            if( args.callback !== undefined ){
                console.log(typeof args.callback)
                args.callback({
                    isHost: true
                });
            }
        }

        console.log('User ' + clientName + endMessage)
    });*/

    socket.on('test', function(msg, callback){
        console.log('hello received');
        if(msg === 'hello'){
            console.log('world responded');
            callback('world');
        }
    });

    socket.on('disconnect', function(){
        connectedSockets.remove(socket.id);
        //TODO: if this socket is host give the host to someone else
    });
});

http.listen(3000, function(){
    console.log("Listening on port 3000");
});