/**
 * Created by LiamF on 15/03/2015.
 */

describe( "Server", function(){
    var server;

    beforeEach(function(){
        //server = new Server();
    });

    it("Creates a server", function(){
        server = new Server();
        expect(server).toBeDefined();
    });

    describe("connect", function(){
        beforeEach(function(){
            server = new Server();
        });
        it("to local server with no parameters", function(){
            console.log(server);
            server.connect();
            expect(server.getIp()).toBeDefined();
            expect(server.isConnected()).toEqual(true);
        });
    })
});
