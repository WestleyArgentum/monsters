(function () {
    var root = this;

    var MONSTER_MORPH_EPSILON = 0.02,
        MONSTER_MORPH_RATE = 0.0125;

    var Monster = root.Monster = function(two, x, y) {
        var blob = this.blob = two.makeCircle(two.width / 2, two.height / 2, two.height / 3);
        blob.fill = 'purple';
        blob.noStroke();

        var eyeRightOuter = two.makeCircle(two.width / 2 + 30, two.height / 2, two.height / 30);
        eyeRightOuter.fill = 'violet'
        eyeRightOuter.noStroke();


        var eyeRightInner = two.makeCircle(two.width / 2 + 30, two.height / 2, two.height / 50);
        eyeRightInner.fill = 'black';

        var eyeLeftOuter = two.makeCircle(two.width / 2 - 30, two.height / 2, two.height / 30);
        eyeLeftOuter.fill = 'violet'
        eyeLeftOuter.noStroke();

        var eyeLeftInner = two.makeCircle(two.width / 2 - 30, two.height / 2, two.height / 50);
        eyeLeftInner.fill = 'black';

        randDestinations(blob);
    }

    Monster.prototype.update = function() {
        for (var i = 0; i < this.blob.vertices.length; i++) {
            var v = this.blob.vertices[i];
            var d = v.destination;

            if (v.distanceTo(d) < MONSTER_MORPH_EPSILON) {
                v.destination = randDestination(this.blob, i);
                continue;
            }

            v.x += (d.x - v.x) * MONSTER_MORPH_RATE;
            v.y += (d.y - v.y) * MONSTER_MORPH_RATE;
        }
    }

    // *******

    function randDestination(blob, i) {
        var pct = (i + 1) / blob.vertices.length;
        var theta = pct * Math.PI * 2;
        var radius = Math.max(Math.random(), 0.3) * 200 + 40;
        var x = radius * Math.cos(theta);
        var y = radius * Math.sin(theta);
        return new Two.Vector(x, y);
    }

    function randDestinations(blob) {
        for (var i = 0; i < blob.vertices.length; i++) {
            var v = blob.vertices[i];
            v.destination = new randDestination(blob, i);
        }
    }

})();
