/**
 * Created by LiamF on 16/03/2015.
 */




describe("Main.js", function(){

    describe('AsteroidGame', function() {
        it('Defines AsteroidGame', function () {
            expect(AsteroidGame).toBeDefined();
        });

        it("Creates a new point", function(){
            var p = new AsteroidGame.Point();
            expect(p.x).toEqual(0);
            expect(p.y).toEqual(0);
        });

        it( "Creates a point with parameters", function(){
            var p = new AsteroidGame.Point(10, 20);
            expect(p.x).toEqual(10);
            expect(p.y).toEqual(20);
        });
    });

    describe('Main class global', function(){
        var main;
        beforeEach(function(){
            main = new AsteroidGame.Main();
        });

        it("Checks Main is defined", function(){
            expect(main).toBeDefined();
        });

        it('Add a new Object to the buffer', function(){
            var object = new AsteroidGame.Object();
            main.addObjectToBuffer(object);
            expect(main.hasObjectInBuffer(object)).toEqual(true);
        });
    });

    describe("Client Specific Main Tests", function(){
        var main;
        beforeEach(function(){
            main = new AsteroidGame.Main();
        });
        it("Passes parameters to Main", function(){
            main = new AsteroidGame.Main({
                width: 1024,
                height: 768,
                hidden: true
            });

            expect(main.getWidth()).toEqual(1024);
            expect(main.getHeight()).toEqual(768);
            expect(main.isHidden()).toEqual(true);
        });

    });
});
