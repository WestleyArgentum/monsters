
(function () {    
    Two.Resolution = 32;

    var world = $('#the-world :first-child')[0];
    var two = new Two({ fullscreen: true }).appendTo(world);

    var entities = [];
    var namedEntities = {};

    var monster = new Monster(two, two.width / 4.0 * 3, two.height / 2.0);
    entities.push(monster);
    namedEntities["monster"] = monster;

    monster = new Monster(two, two.width / 4.0, two.height / 3.0);
    entities.push(monster);
    namedEntities["monster2"] = monster;

    two.bind('update', function() {
        for (var i = 0; i < entities.length; ++i) {
            entities[i].update();
        }

    }).play();

})();
