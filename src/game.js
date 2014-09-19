
(function () {
    var root = this;
    
    Two.Resolution = 32;

    var world = $('#the-world :first-child')[0];
    var two = new Two({ fullscreen: true }).appendTo(world);

    var m = new Monster(two);


    // var MONSTER_MORPH_EPSILON = 0.02,
    //     MONSTER_MORPH_RATE = 0.0125;

    // var blob = two.makeCircle(two.width / 2, two.height / 2, two.height / 3);
    // blob.fill = 'purple';
    // blob.noStroke();

    // var eyeRightOuter = two.makeCircle(two.width / 2 + 30, two.height / 2, two.height / 30);
    // eyeRightOuter.fill = 'violet'
    // eyeRightOuter.noStroke();


    // var eyeRightInner = two.makeCircle(two.width / 2 + 30, two.height / 2, two.height / 50);
    // eyeRightInner.fill = 'black';


    // var eyeLeftOuter = two.makeCircle(two.width / 2 - 30, two.height / 2, two.height / 30);
    // eyeLeftOuter.fill = 'violet'
    // eyeLeftOuter.noStroke();

    // var eyeLeftInner = two.makeCircle(two.width / 2 - 30, two.height / 2, two.height / 50);
    // eyeLeftInner.fill = 'black';


    // reset();

    two.bind('update', function() {
        m.update();
        // for (var i = 0; i < blob.vertices.length; i++) {
        //     var v = blob.vertices[i];
        //     var d = v.destination;

        //     if (v.distanceTo(d) < MONSTER_MORPH_EPSILON) {
        //         v.destination = randDestination(i);
        //         continue;
        //     }

        //     v.x += (d.x - v.x) * MONSTER_MORPH_RATE;
        //     v.y += (d.y - v.y) * MONSTER_MORPH_RATE;
        // }

    }).play();

    // function randDestination(i) {
    //     var pct = (i + 1) / blob.vertices.length;
    //     var theta = pct * Math.PI * 2;
    //     var radius = Math.max(Math.random(), 0.3) * two.height / 3 + two.height / 6;
    //     var x = radius * Math.cos(theta);
    //     var y = radius * Math.sin(theta);
    //     return new Two.Vector(x, y);
    // }

    // function reset() {
    //     for (var i = 0; i < blob.vertices.length; i++) {
    //         var v = blob.vertices[i];
    //         v.destination = new randDestination(i);
    //     }
    // }

})();