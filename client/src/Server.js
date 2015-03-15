/**
 * Created by LiamF on 15/03/2015.
 */

var Server = function(ip){
    this.defaultIp = "http://localhost",
    this.defaultPort = "3000",
    this._ip = ip || "127.0.0.1", // used to store the ip.
    this.connected = false;
    this._socket = null; // To be set to io()
};

// Function for connecting to a server
Server.prototype.connect = function(ip){
    // Set the ip to either the defined one or the default ip in Server
    this._ip = ip || this.defaultIp+':'+this.defaultPort;
    // Connect the socket using io passing through the calculated IP
    this._socket = io.connect(this._ip);

    //TODO: add some kind of logic to catch connection errors
    this.connected = true;
};

// Simple Return of IP
Server.prototype.getIp = function(){
    return this._ip;
}

// Returns true or false depending on whether there is a connection
Server.prototype.isConnected = function(){
    return this.connected;
}