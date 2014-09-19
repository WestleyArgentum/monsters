
(function () {    
    Two.Resolution = 32;

    var world = $('#the-world :first-child')[0];
    var two = new Two({ fullscreen: true }).appendTo(world);

    var entities = [];
    var namedEntities = {};

    var monster = new Monster(two);
    entities.push(monster);
    namedEntities["monster"] = monster;

    two.bind('update', function() {
        for (var i = 0; i < entities.length; ++i) {
            entities[i].update();
        }

    }).play();

})();
