/**
 * Created by LiamF on 17/03/2015.
 */

require('../src/Object.js');

describe('AsteroidGame.Object', function(){
    var object;
    beforeEach( function(){
        object = new AsteroidGame.Object();
    });

    it("Creates a new Object", function(){
        object = new AsteroidGame.Object();
        expect(object).toBeDefined();
        expect(object.getLocation()).toEqual({x:0, y:0});
    });

    it("Creates a new Object with arg parameters", function(){
        object = new AsteroidGame.Object({
            loc: {x:3, y:6}
        });
        expect(object.getLocation()).toEqual({x:3, y:6});
    });

    it( "Sets an objects location", function(){
        object.setLocation(10, 20);
        expect(object.getLocation()).toEqual({x:10, y:20});
    });

    it( "Moves an object", function(){
        object.move({x:50});
        expect(object.getLocation()).toEqual({x:50, y:0});
    });

    it( "Gets a unique objectID ", function(){
        var id,
            id2;

        id = AsteroidGame.getUniqueObjectId();
        id2 = AsteroidGame.getUniqueObjectId();

        expect(id === id2).toEqual(false);
    })
});