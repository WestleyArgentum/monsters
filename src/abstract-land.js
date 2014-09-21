(function (){
    var root = this;

    var AbstractLand = root.AbstractLand = function(two) {
        var land = new Land(two);
        Engine.addEntity(land, 'abstractLand');

        var monster = new SquishyMonster(two, two.width / 4.0 * 3, two.height / 2.0);
        Engine.addEntity(monster, 'monster1');

        var monster2 = new SquishyMonster(two, two.width / 4.0, two.height / 3.0);
        Engine.addEntity(monster2, 'monster2');
    }

    var Land = function(two) {
        this.land = two.makeRectangle(two.width / 2.0, two.height / 2.0, two.width, two.height);
        this.land.fill = 'pink';
    }

    Land.prototype.update = function() {
    }

})();