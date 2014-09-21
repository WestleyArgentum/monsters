
(function () {
    Two.Resolution = 32;

    var world = $('#the-world :first-child')[0];
    var two = new Two({ fullscreen: true }).appendTo(world);

    // register levels here
    Engine.addLevel('AbstractLand', AbstractLand);

    // load the starting level
    Engine.loadLevel(two, 'AbstractLand');

    // shortcuts for jumping to particular levels
    $(document).bind('keypress', function(e) {
        var code = e.keyCode || e.which;
        var level;

        switch(code) {
            case 'a'.charCodeAt():
                level = 'AbstractLand';
                break;
        }

        level && Engine.loadLevel(two, level);
    });

    two.bind('update', function() {
        var time = two.timeDelta / 1000 || 1 / 60;
        for (var i = 0; i < Engine.entities.length; ++i) {
            Engine.entities[i].update(time);
        }

    }).play();

})();
