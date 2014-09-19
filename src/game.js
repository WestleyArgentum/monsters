
(function () {    
    Two.Resolution = 32;

    var world = $('#the-world :first-child')[0];
    var two = new Two({ fullscreen: true }).appendTo(world);

    var entities = [];
    var namedEntities = {};

    var land = new AbstractLand(two);
    entities.push(land);
    namedEntities['land'];

    var monster = new Monster(two, two.width / 4.0 * 3, two.height / 2.0);
    entities.push(monster);
    namedEntities['monster'] = monster;

    monster = new Monster(two, two.width / 4.0, two.height / 3.0);
    entities.push(monster);
    namedEntities['monster2'] = monster;

    two.bind('update', function() {
        var time = two.timeDelta / 1000 || 1 / 60;
        for (var i = 0; i < entities.length; ++i) {
            entities[i].update(time);
        }

    }).play();

})();
