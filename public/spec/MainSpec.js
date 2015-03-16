/**
 * Created by LiamF on 16/03/2015.
 */

describe("Main.js", function(){
    var main;
    beforeEach(function(){
        main = new AsteroidGame.Main();
    });

    it("Checks Main is defined", function(){
        expect(main).toBeDefined();
    });

    it("Passes parameters to Main", function(){
        main = new AsteroidGame.Main({
            width: 1024,
            height: 768,
            hidden: true
        })

        expect(main.getWidth()).toEqual(1024);
        expect(main.getHeight()).toEqual(768);
        expect(main.isHidden()).toEqual(true);
    })
})