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
        it("to local server with no parameters", function(){
            server.connect();
            expect(server.getIp()).toBeDefined();
            expect(server.isConnected()).toEqual(true);
        });

        it("joins an IP and Port together", function(){
            var port = server.joinUrlPort("http://127.0.0.1", 3000);
            expect(port).toEqual("http://127.0.0.1:3000");
        });
    });

    describe("Send Hello Receive World from server", function(){
        var responded = false,
            response;
        beforeEach(function(done){
            server.emit('test', 'hello', function(res){
                responded = true;
                response = res;
                done();
            });
        });

        it('responded', function(){
            expect(responded).toEqual(true);
        });

        it('responded "world"', function(){
            expect(response).toEqual('world');
        });
    });

    describe("Drops host and gives host to another user", function(){
        var server2;

        beforeEach(function(done){
            server2 = new Server();
            server2.clientName = "server2";
            server2.connect({
                callback: function(){
                    server.disconnect();
                    setTimeout(function(){
                        done();
                    }, 500)
                }
            });
        });


        it("gives host to server 2", function(){
            //server.disconnect();
            expect(server2.isHost).toEqual(true);
        })
    });

});
