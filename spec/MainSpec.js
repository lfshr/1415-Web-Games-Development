/**
 * Created by LiamF on 17/03/2015.
 */

require('../src/Main.js');

describe('AsteroidGame', function(){
    it( 'Defines AsteroidGame', function(){
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

    describe('AsteroidGame.Main', function(){
        var main;
        beforeEach(function(){
            main = new AsteroidGame.Main();
        });

        it("Defines a Main class", function(){
            expect(main).toBeDefined();
            expect(main.players).toBeDefined();
            expect(main.state).toEqual(AsteroidGame.NOSTATE);
        });

        it('Add a new Object to the buffer', function(){
            var object = new AsteroidGame.Object();
            main.addObjectToBuffer(object);
            expect(main.hasObjectInBuffer(object)).toEqual(true);
        });
    });


});