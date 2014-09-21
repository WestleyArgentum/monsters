
(function () {
    Two.Resolution = 32;

    var world = $('#the-world :first-child')[0];
    var two = new Two({ fullscreen: true }).appendTo(world);

    Engine.addLevel("AbstractLand", AbstractLand);

    Engine.loadLevel(two, "AbstractLand");

    two.bind('update', function() {
        var time = two.timeDelta / 1000 || 1 / 60;
        for (var i = 0; i < Engine.entities.length; ++i) {
            Engine.entities[i].update(time);
        }

    }).play();

})();
