/**
 * Created by LiamF on 15/03/2015.
 */
var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('user connected');

    socket.on('test', function(msg, callback){
        console.log('hello received');
        if(msg === 'hello'){
            console.log('world responded');
            callback('world');
        }
    });
});

http.listen(3000, function(){
    console.log("Listening on port 3000");
});