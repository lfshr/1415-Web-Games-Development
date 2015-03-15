/**
 * Created by LiamF on 15/03/2015.
 */

/**
 * @param ip
 * @constructor
 */
var Server = function(){
    this.defaultIp = "http://localhost";
    this.defaultPort = "3000";
    this._ip = this.joinUrlPort(this.defaultIp, this.defaultPort); // used to store the ip.
    this.connected = false;
    this._socket = null; // To be set to io()
};

// Function for connecting to a server
Server.prototype.connect = function(ip){
    // Set the ip to either the defined one or the default ip in Server
    this._ip = ip || this._ip;
    // Connect the socket using io passing through the calculated IP
    this._socket = io.connect(this._ip);

    //TODO: add some kind of logic to catch connection errors
    this.connected = true;
};


/**
 * @returns {string}
 */
// Simple Return of IP
Server.prototype.getIp = function(){
    return this._ip;
}

/**
 *
 * @returns {boolean|*}
 */
// Returns true or false depending on whether there is a connection
Server.prototype.isConnected = function(){
    return this.connected;
}

/**
 *
 * @param ip
 * @param port
 * @returns {string}
 */

Server.prototype.joinUrlPort = function(ip, port, changeIp){
    var ret = ip+":"+port,
        changeIp = changeIp || false;
    if( changeIp ){
        this._ip = ret;
    }
    return ret;
};

Server.prototype.emit = function(channel, msg, callback){
    if( this.isConnected() ){

        this._socket.emit(channel, msg, callback);
    }
}